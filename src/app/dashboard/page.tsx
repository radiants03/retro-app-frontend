"use client";

import BoardContainer from "@/components/Divs/BoardContainer";
import CreateBoardContainer from "@/components/Divs/CreateBoardContainer";
import Header from "@/components/header/Header";
import { getAllBoards } from "@/utils/api/dashboard";
import { SortOrder } from "@/utils/api/enum";
import { getDateFromTimestamp } from "@/utils/DateTime";
import { TDashboardBoard } from "@/utils/type";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [boards, setBoards] = useState<TDashboardBoard>();

  const fetchAllBoards = async () => {
    const payload = {
      sortBy: SortOrder.DESC,
    };
    const { data, error } = await getAllBoards(payload);
    if (!error) {
      setBoards(data);
    }
  };

  useEffect(() => {
    fetchAllBoards();
  }, []);

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
            <h1 className="text-4xl font-bold pb-15">
              Welcome. Your retros here!
            </h1>

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
