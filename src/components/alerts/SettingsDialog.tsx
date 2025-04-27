import { getBoardDetailsById, updateBoard } from "@/utils/api/board";
import { PUpdateBoard } from "@/utils/api/payloads";
import { useEffect, useState } from "react";
import FilledButton from "../buttons/FilledButton";
import Switch from "../buttons/Switch";
import { CloseIcon } from "../icons/icons";

interface Props {
  boardId: number;
  close: () => void;
  fetchBoardDataFromParent: () => void;
  fetchAllCategories: () => void;
}

const SettingsDialog = ({ boardId, close, fetchBoardDataFromParent, fetchAllCategories }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [displayNames, setDisplayNames] = useState<boolean>(true);
  const [displayLikes, setDisplayLikes] = useState<boolean>(true);
  const [displayComments, setDisplayComments] = useState<boolean>(true);

  const fetchBoardData = async () => {
    try {
      const { data, error } = await getBoardDetailsById(boardId);
      if (!error) {
        setTitle(data.title);
        setDisplayNames(data.show_names);
        setDisplayLikes(data.show_likes);
        setDisplayComments(data.show_comments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateSettings = async () => {
    const payload: PUpdateBoard = {
      title: title,
      show_names: displayNames !== undefined ? displayNames : true,
      show_likes: displayLikes !== undefined ? displayLikes : true,
      show_comments: displayComments !== undefined ? displayComments : true,
      is_public: true,
    };
    await updateBoard(boardId, payload);
    fetchBoardDataFromParent()
    fetchAllCategories()
    close();
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex flex-row w-full justify-between pb-5">
          <div>
            <p className="text-black/50 text-md pt-5">Dashboard /</p>
            <h1 className="text-2xl font-bold">Board settings</h1>
          </div>
          <button
            className="rounded-sm py-1 px-1 hover:bg-gray-300 mb-5 text-sm cursor-pointer transition-all duration-100 w-fit h-fit"
            onClick={close}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 w-60 pt-5 pb-10">
          <Switch
            label="Display names"
            className="w-full"
            value={displayNames}
            onChange={(e) => setDisplayNames(e)}
          />
          <Switch
            label="Likes"
            className="w-full"
            value={displayLikes}
            onChange={(e) => setDisplayLikes(e)}
          />
          <Switch
            label="Comments"
            className="w-full"
            value={displayComments}
            onChange={(e) => setDisplayComments(e)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <FilledButton label="Apply" onClick={updateSettings} />
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
