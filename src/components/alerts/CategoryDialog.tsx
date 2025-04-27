import { createCategory } from "@/utils/api/category";
import { PCreateCategory } from "@/utils/api/payloads";
import { useState } from "react";
import FilledButton from "../buttons/FilledButton";
import InputField from "../fields/InputField";
import { CloseIcon } from "../icons/icons";

interface Props {
  boardId: number;
  close: () => void;
  fetchBoardDataFromParent: () => void;
  fetchAllCategories: () => void;
}

const CategoryDialog = ({
  boardId,
  close,
  fetchBoardDataFromParent,
  fetchAllCategories,
}: Props) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    const payload: PCreateCategory = {
      category_name: categoryName,
      board_id: Number(boardId),
    };
    await createCategory(payload);
    fetchBoardDataFromParent();
    fetchAllCategories();
    close()
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex flex-row w-full justify-between pb-5">
          <div>
            <p className="text-black/50 text-md pt-5">Dashboard /</p>
            <h1 className="text-2xl font-bold">Add column</h1>
          </div>
          <button
            className="rounded-sm py-1 px-1 hover:bg-gray-300 mb-5 text-sm cursor-pointer transition-all duration-100 w-fit h-fit"
            onClick={close}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 w-60 pt-5 pb-10">
          <InputField
            type="text"
            placeholder="Column name"
            required
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <FilledButton label="Add" onClick={handleCreateCategory} />
        </div>
      </div>
    </div>
  );
};

export default CategoryDialog;
