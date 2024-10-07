import { getAdminProfile } from "@/actions";
import Image from "next/image";
import React from "react";
import ProfileBtn from "./profileBtn";

const Header = async ({
  title,
  showLogout = false,
}: {
  title: string;
  showLogout?: boolean;
}) => {
  const res = await getAdminProfile();

  if (!res) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 w-full sticky top-0 !z-[999] px-11 py-3  items-center bg-grayTwo">
      <div className="w-full">
        <h1 className="text-xl font-bold text-black  ">{title}</h1>
      </div>
      <div className="w-full flex justify-end items-center gap-x-6">
        {!showLogout && (
          <form className="w-full">
            <input
              placeholder="Search Artist, Collection, Collectors"
              className="px-4 py-[10px] w-full outline-none border border-[#E2E8F0] placeholder:text-[#868686] rounded-full "
            />
          </form>
        )}

        <ProfileBtn profile={res} showLogout={showLogout} />
      </div>
    </div>
  );
};

export default Header;
