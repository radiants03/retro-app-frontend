"use client";

import { useRouter } from "next/navigation";
import FilledButton from "../buttons/FilledButton";
import { ProfileIcon } from "../icons/icons";

interface Props {
  hideNavigation?: boolean;
  showProfile?: boolean;
  username?: string
}

const Header = ({ hideNavigation, showProfile, username }: Props) => {
  const { push } = useRouter();

  return (
    <header className="w-full bg-gray-50 py-2 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          width={54}
          className="h-auto"
          onClick={() => push("/")}
        />

        {/* Navigation */}
        {!hideNavigation && (
          <div className="flex items-center space-x-10">
            <a href="/login" className="underline">
              Log in
            </a>
            <FilledButton label={"Sign up"} onClick={() => push("/signup")} />
          </div>
        )}

        {/* Profile */}
        {showProfile && (
          <div
            className="flex items-center space-x-5 cursor-pointer hover:text-yellow-500 transition-all duration-200"
            onClick={() => push("/profile")}
          >
            <p className="font-bold capitalize">{username || 'unknown'}</p>
            <ProfileIcon className="size-13" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
