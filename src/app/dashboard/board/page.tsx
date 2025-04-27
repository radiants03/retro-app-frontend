"use client";

import Alert from "@/components/alerts/Alert";
import CategoryDialog from "@/components/alerts/CategoryDialog";
import SettingsDialog from "@/components/alerts/SettingsDialog";
import CategoryContainer from "@/components/Divs/CategoryContainer";
import CardInput from "@/components/fields/CardInput";
import Header from "@/components/header/Header";
import {
  PencilIcon,
  PlusInCircleIcon,
  ReturnIcon,
  SettingsIcon,
} from "@/components/icons/icons";
import { getBoardDetailsById, updateBoard } from "@/utils/api/board";
import { getCategoriesByBoardId } from "@/utils/api/category";
import { PUpdateBoard } from "@/utils/api/payloads";
import { ColorPalette } from "@/utils/color";
import { TBoard, TCategory } from "@/utils/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  boardId: number;
}

const Board = ({ boardId }: Props) => {
  const { push } = useRouter();
  const [boardData, setBoardData] = useState<TBoard>();
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleContent, setEditTitleContent] = useState("");
  const [previousTitle, setPreviousTitle] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [currentlyEditingCardId, setCurrentlyEditingCardId] = useState<
    number | undefined
  >(undefined);
  const [currentlyEditingCommentId, setCurrentlyEditingCommentId] = useState<
    number | undefined
  >(undefined);

  const [alert, setAlert] = useState<{
    text: string;
    type: "error" | "info" | "default" | "success" | "warning";
  }>({ text: "", type: "default" });

  const fetchBoardData = async () => {
    const { data, error } = await getBoardDetailsById(boardId);
    if (!error) {
      setBoardData(data);
    } else {
      setAlert({
        text: error,
        type: "error",
      });
    }
  };

  const fetchAllCategories = async () => {
    const { data, error } = await getCategoriesByBoardId(boardId);
    if (!error) {
      setCategories(data);
    } else {
      setAlert({
        text: error,
        type: "error",
      });
    }
  };

  const handleUpdateBoard = async (title: string) => {
    const payload: PUpdateBoard = {
      title: title,
      show_names: boardData?.show_names || false,
      show_likes: boardData?.show_likes || false,
      show_comments: boardData?.show_comments || false,
      is_public: boardData?.is_public || false,
    };
    const { data, error } = await updateBoard(boardId, payload);
    if (!error) {
      fetchBoardData();
      fetchAllCategories();
    } else {
      setAlert({
        text: error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBoardData();
      await fetchAllCategories();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (categories) {
      setColorPalette(ColorPalette(categories.length));
    }
  }, [categories]);

  return (
    <>
      <div className="h-screen">
        <Header
          hideNavigation
          showProfile
          username={localStorage.getItem("username") || "unknown"}
        />
        <div
          className="flex flex-row h-full justify-center px-10"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.id === "board-title") {
              setIsEditingTitle(true);
              if (boardData) {
                setEditTitleContent(boardData.title);
                setPreviousTitle(boardData.title);
              }
            }
          }}
        >
          <div className="container flex flex-col pt-30">
            <Alert label={alert.text} type={alert.type} className="mb-10" />
            <button
              className="rounded-sm py-1 px-1 hover:bg-gray-300 mb-5 text-sm cursor-pointer transition-all duration-100 w-fit h-fit"
              onClick={() => push("/dashboard")}
            >
              <ReturnIcon className="h-4 w-4" />
            </button>
            <p className="text-black/50 text-lg pb-4">
              Dashboard / {boardData?.title}
            </p>
            {!isEditingTitle && (
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-15 justify-between">
                <div className="group flex flex-row gap-5 items-center">
                  <h1
                    className="text-4xl font-bold cursor-pointer"
                    id="board-title"
                  >
                    {boardData?.title || "Untitled board"}
                  </h1>
                  <button
                    className="rounded-sm py-1 px-1 hover:bg-white/20 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-100 w-fit h-fit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingTitle(true);
                      if (boardData) {
                        setEditTitleContent(boardData.title);
                        setPreviousTitle(boardData.title);
                      }
                    }}
                  >
                    <PencilIcon className="text-gray-500 w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-row justify-between items-center gap-5">
                  <button
                    className="flex flex-row rounded-sm py-1 px-2 hover:bg-gray-300 text-sm cursor-pointer transition-all duration-100 w-fit h-fit justify-between items-center gap-2"
                    onClick={(e) => {
                      setShowCategoryDialog(true);
                    }}
                  >
                    Add column{" "}
                    <PlusInCircleIcon className="text-gray-500 w-5 h-5" />
                  </button>
                  <button
                    className="rounded-sm py-1 px-1 hover:bg-gray-300 text-sm cursor-pointer transition-all duration-100 w-fit h-fit"
                    onClick={(e) => {
                      setShowSettings(true);
                    }}
                  >
                    <SettingsIcon className="text-gray-500 w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {isEditingTitle && (
              <CardInput
                id="board-title-input"
                placeholder="Enter board title..."
                value={editTitleContent}
                textType="board"
                onBlur={(e) => {
                  if (editTitleContent !== "") {
                    handleUpdateBoard(e.currentTarget.value);
                    setIsEditingTitle(false);
                  } else {
                    setEditTitleContent(previousTitle);
                    setIsEditingTitle(false);
                  }
                }}
                onChange={(e) => {
                  setEditTitleContent(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    if (editTitleContent !== "") {
                      handleUpdateBoard(e.currentTarget.value);
                      setIsEditingTitle(false);
                    } else {
                      setEditTitleContent(previousTitle);
                      setIsEditingTitle(false);
                    }
                  }
                }}
              />
            )}
            {/* Category list */}
            <div className="flex flex-row flex-wrap gap-6">
              {boardData &&
                categories.map((category, index) => (
                  <CategoryContainer
                    key={`category-${index}`}
                    id={category.id}
                    title={category.category_name}
                    color={colorPalette[index]}
                    setCurrentlyEditingCardId={setCurrentlyEditingCardId}
                    currentlyEditingCardId={currentlyEditingCardId}
                    setCurrentlyEditingCommentId={setCurrentlyEditingCommentId}
                    currentlyEditingCommentId={currentlyEditingCommentId}
                    boardData={boardData}
                    boardId={boardId}
                    fetchAllCategories={fetchAllCategories}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {showSettings && (
        <SettingsDialog
          boardId={boardId}
          close={() => setShowSettings(false)}
          fetchBoardDataFromParent={fetchBoardData}
          fetchAllCategories={fetchAllCategories}
        />
      )}
      {showCategoryDialog && (
        <CategoryDialog
          boardId={boardId as number}
          close={() => setShowCategoryDialog(false)}
          fetchBoardDataFromParent={fetchBoardData}
          fetchAllCategories={fetchAllCategories}
        />
      )}
    </>
  );
};
export default Board;
