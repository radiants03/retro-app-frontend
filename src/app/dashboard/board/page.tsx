"use client";

import Alert from "@/components/alerts/Alert";
import CategoryContainer from "@/components/Divs/CategoryContainer";
import Header from "@/components/header/Header";
import { getBoardDetailsById } from "@/utils/api/board";
import { getCategoriesByBoardId } from "@/utils/api/category";
import { ColorPalette } from "@/utils/color";
import { TBoard, TCategory } from "@/utils/type";
import { useEffect, useState } from "react";

interface Props {
  boardId: number;
}

const Board = ({ boardId }: Props) => {
  const [boardData, setBoardData] = useState<TBoard>();
  const [categories, setCategories] = useState<TCategory[]>([]);

  const [colorPalette, setColorPalette] = useState<string[]>([]);

  const [currentlyEditingCardId, setCurrentlyEditingCardId] = useState<number | undefined>(undefined);
  const [currentlyEditingCommentId, setCurrentlyEditingCommentId] = useState<number | undefined>(undefined);

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
  }

  useEffect(() => {
    fetchBoardData();
    fetchAllCategories();
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
        <div className="flex flex-row h-full justify-center px-10">
          <div className="container flex flex-col pt-30">
            <Alert label={alert.text} type={alert.type} className="mb-10" />
            <p className="text-black/50 text-lg pb-4">
              Dashboard / {boardData?.title}
            </p>
            <h1 className="text-4xl font-bold pb-15">
              {boardData?.title || "Untitled board"}
            </h1>

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
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Board;
