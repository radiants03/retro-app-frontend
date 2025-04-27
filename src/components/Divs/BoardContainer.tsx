import { deleteBoard } from "@/utils/api/board";
import { ColorPalette } from "@/utils/color";
import { useRouter } from "next/navigation";
import { RemoveIcon } from "../icons/icons";

interface Props {
  id: number;
  title: string;
  date: string;
  likes?: number;
  categoriesLength?: number[];
  fetchAllBoards: () => void;
}

const BoardContainer = ({
  id,
  title,
  date,
  likes,
  categoriesLength,
  fetchAllBoards,
}: Props) => {
  const { push } = useRouter();
  const colorPalette = ColorPalette(categoriesLength?.length ?? 0);

  const sumOfCategoryLengths =
    categoriesLength?.reduce((acc, num) => acc + num, 0) ?? 0;

  const handleDeleteBoard = async () => {
    await deleteBoard(id);
    fetchAllBoards();
  };

  return (
    <div
      className="group flex flex-row items-center rounded-xl py-13 px-15 bg-gray-50 hover:bg-yellow-50 border border-gray-200 hover:shadow-md transition-all duration-100 cursor-pointer hover:border-yellow-500 w-full lg:w-auto lg:min-w-[300px] max-w-full gap-30"
      onClick={() => push(`/dashboard/board/${id}`)}
    >
      <div className="flex flex-col space-y-3 truncate w-full">
        <div className="flex flex-row items-center justify-between w-full gap-5">
          <h1 className="text-2xl font-bold">{title || "Untitled"}</h1>
          <button
            className="text-white rounded-sm py-1 px-1 hover:bg-red-200 transition-all duration-100 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteBoard();
            }}
          >
            <RemoveIcon className="text-black w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-black/50 text-sm">{date}</p>
          {/* {likes && (
            <p className="text-black/50 bg-green-500 text-white font-bold py-1/2 px-3 rounded">
              {likes} likes
            </p>
          )} */}
        </div>
        {categoriesLength && (
          <div className="flex flex-row w-full rounded overflow-hidden">
            {categoriesLength.map((item, index) => (
              <div
                key={`board-${index}`}
                style={{
                  background: colorPalette[index],
                  height: "8px",
                  width: `${(item / sumOfCategoryLengths) * 100}%`,
                  marginRight:
                    index !== categoriesLength.length - 1 ? "1px" : "0",
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default BoardContainer;
