"use client";
import { deleteSession } from "@/actions";
import { Admin } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileBtn = ({
  profile,
  showLogout,
}: {
  profile: Admin;
  showLogout?: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      {showLogout ? (
        <div
          onClick={async () => {
            await deleteSession("admin_token");
            router.refresh();
          }}
          className="py-3 px-[52px] min-w-max  cursor-pointer bg-black w-auto box-border rounded-full  gap-x-3 flex items-center"
        >
          <h1 className="text-white text-xs whitespace-nowrap font-medium ">
            Logout
          </h1>
        </div>
      ) : (
        <div
          onClick={() => router.push("/admin/settings")}
          className="p-2 pr-3 min-w-max  cursor-pointer bg-black w-auto box-border rounded-full  gap-x-3 flex items-center"
        >
          <Image
            src={profile.profile_image}
            width={24}
            height={24}
            className="rounded-full"
            alt="Admin Image"
          />
          <h1 className="text-white text-xs whitespace-nowrap font-medium ">
            {profile.full_name}
          </h1>
        </div>
      )}
    </>
  );
};

export default ProfileBtn;
