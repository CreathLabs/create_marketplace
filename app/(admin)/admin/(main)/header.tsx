import { getAdminProfile } from "@/actions";
import Image from "next/image";
import React from "react";

const Header = async () => {
  const res = await getAdminProfile();

  if (!res) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 w-full sticky top-0 !z-[999] px-11 py-3  items-center bg-grayTwo">
      <div className="w-full">
        <h1 className="text-xl font-bold text-black  ">Dashboard</h1>
      </div>
      <div className="w-full flex justify-end items-center gap-x-6">
        <form className="w-full">
          <input
            placeholder="Search Artist, Collection, Collectors"
            className="px-4 py-[10px] w-full outline-none border border-[#E2E8F0] placeholder:text-[#868686] rounded-full "
          />
        </form>
        <div className="p-2 pr-3 min-w-max  bg-black w-auto box-border rounded-full  gap-x-3 flex items-center">
          <Image
            src={res.profile_image}
            width={24}
            height={24}
            className="rounded-full"
            alt="Admin Image"
          />
          <h1 className="text-white text-xs whitespace-nowrap font-medium ">
            {res.full_name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
