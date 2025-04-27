"use client";

import FilledButton from "@/components/buttons/FilledButton";
import { logout } from "@/utils/api/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { push } = useRouter();

  const handleLogout = async () => {
    logout();
    Cookies.remove("token");
    localStorage.clear();
    push("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page</p>
      <FilledButton label="Logout" onClick={handleLogout} />
    </div>
  );
};
export default Profile;
