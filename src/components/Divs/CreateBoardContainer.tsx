import { useRouter } from "next/navigation";
import { PlusInCircleIcon } from "../icons/icons";

const CreateBoardContainer = () => {
  const { push } = useRouter();

  return (
    <div
      className="group flex flex-row items-center rounded-xl py-13 px-15 border-2 border-gray-200 border-dashed transition-all duration-100 cursor-pointer hover:border-yellow-500 w-full lg:w-auto gap-30"
      onClick={() => push("/dashboard/board")}
    >
      <div className="flex flex-col space-y-3 items-center w-full">
        <h1 className="text-xl text-gray-500 text-bold transition-colors duration-200 group-hover:text-yellow-500">
          Create new board
        </h1>
        <PlusInCircleIcon className="size-8 text-gray-400 transition-colors duration-200 group-hover:text-yellow-500" />
      </div>
    </div>
  );
};
export default CreateBoardContainer;
