"use client";

import BoardContainer from "@/components/Divs/BoardContainer";
import CreateBoardContainer from "@/components/Divs/CreateBoardContainer";
import Header from "@/components/header/Header";
import { SortASCIcon, SortDESCIcon } from "@/components/icons/icons";
import { getAllBoards } from "@/utils/api/dashboard";
import { SortOrder } from "@/utils/api/enum";
import { getDateFromTimestamp } from "@/utils/DateTime";
import { TDashboardBoard } from "@/utils/type";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [boards, setBoards] = useState<TDashboardBoard>();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const fetchAllBoards = async () => {
    setBoards(undefined)
    const payload = {
      sortBy: sortOrder,
    };
    const { data, error } = await getAllBoards(payload);
    if (!error) {
      setBoards(data);
    }
  };

  const handleSortBoards = () => {
    if (sortOrder === SortOrder.ASC) {
      setSortOrder(SortOrder.DESC)
    } else {
      setSortOrder(SortOrder.ASC)
    }
  };

  useEffect(() => {
    fetchAllBoards();
  }, [sortOrder]);

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
            <p className="text-black/50 text-lg pb-4">Dashboard</p>
            <div className="flex flex-row items-end justify-between gap-5 pb-15 w-full">
              <h1 className="text-4xl font-bold">Welcome. Your retros here!</h1>
              <button
                className="flex flex-row rounded-sm py-1 px-1 hover:bg-gray-300 text-sm cursor-pointer transition-all duration-100 w-fit h-fit gap-2"
                onClick={() => handleSortBoards()}
              >
                Date created
                {sortOrder === SortOrder.ASC ? (
                  <SortASCIcon className="h-5 w-5" />
                ) : (
                  <SortDESCIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Board list */}
            <div className="flex flex-row flex-wrap gap-6 pb-10">
              <CreateBoardContainer />

              {boards?.map((item, index) => (
                <BoardContainer
                  key={`board-${index}`}
                  id={item.id}
                  title={item.title}
                  date={getDateFromTimestamp(item.created_date)}
                  likes={10}
                  categoriesLength={item.cardCountPerCategory}
                  fetchAllBoards={fetchAllBoards}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
