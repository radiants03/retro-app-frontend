"use client";

import FilledButton from "@/components/buttons/FilledButton";
import { logout, userProfile } from "@/utils/api/user";
import { TUser } from "@/utils/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const { push } = useRouter();
  const [userData, setUserData] = useState<TUser>();

  const fetchUserData = async () => {
    const { data, error } = await userProfile();
    if (!error) {
      setUserData(data);
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    push("/");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="h-screen">
      <div className="flex flex-row h-full">
        <div className="flex w-full h-full items-center justify-center px-10">
          <div className="w-96">
            <p className="text-black/50 text-lg pb-2">
              Dashboard / Profile Management
            </p>
            <h1 className="text-4xl font-bold pb-15">
              {userData?.first_name} {userData?.last_name}
            </h1>
            <div className="flex flex-col space-y-4 pb-15">
              <div className="flex flex-row w-full justify-between pb-2">
                <p className="font-bold">Last login</p>
                <p className="text-gray-500">{userData?.last_login}</p>
              </div>
              <div className="flex flex-row w-full justify-between pb-2">
                <p className="font-bold">Email</p>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
              <a href="/forgot-password" className="text-yellow-600 underline">
                Change password
              </a>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-center">
              <FilledButton label="Logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
