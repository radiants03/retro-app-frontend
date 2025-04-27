import { ColorPalette } from "@/utils/color";
import { useRouter } from "next/navigation";

interface Props {
  id: number,
  title: string;
  date: string;
  likes?: number;
  categoriesLength?: number[];
}

const BoardContainer = ({ id, title, date, likes, categoriesLength }: Props) => {
  const { push } = useRouter();
  const colorPalette = ColorPalette(categoriesLength?.length ?? 0);

  const sumOfCategoryLengths =
    categoriesLength?.reduce((acc, num) => acc + num, 0) ?? 0;

  return (
    <div
      className="flex flex-row items-center rounded-xl py-13 px-15 bg-gray-50 hover:bg-yellow-50 border-1 border-gray-200 hover:shadow-md transition-all duration-100 cursor-pointer hover:border-yellow-500 w-full lg:w-auto max-w-full gap-30"
      onClick={() => push(`/dashboard/board/${id}`)}
    >
      <div className="flex flex-col space-y-3 truncate w-full">
        <h1 className="text-2xl font-bold">{title || "Untitled"}</h1>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-black/50 text-sm">{date}</p>
          {likes && (
            <p className="text-black/50 bg-green-500 text-white font-bold py-1/2 px-3 rounded">
              {likes} likes
            </p>
          )}
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
