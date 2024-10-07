"use client";
import { getAdminExhibitions } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { truncate } from "lodash";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  exhibs,
}: {
  exhibs: Awaited<ReturnType<typeof getAdminExhibitions>>;
}) => {
  const router = useRouter();
  return (
    <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
      <div className="grid grid-cols-4 w-full bg-grayTwo py-4 px-6   ">
        {[
          {
            title: "Name",
            icon: "material-symbols:person",
          },
          {
            title: "Type",
            icon: "ph:bank-fill",
          },
          {
            title: "Date",
            icon: "heroicons:identification-20-solid",
          },
          {
            title: "Creation Date",
            icon: "clarity:date-solid",
          },
        ].map((item, index) => (
          <div key={index} className="w-full flex items-center space-x-2 ">
            <Icon icon={item.icon} className="!text-base" />
            <h1 className="font-bold text-sm">{item.title}</h1>
          </div>
        ))}
      </div>
      <div className="">
        {exhibs?.data?.map((e) => (
          <div
            key={e.id}
            onClick={() => router.push(`/admin/exhibitions/${e.id}`)}
            className="grid grid-cols-4 cursor-pointer w-full h-auto  py-4 px-6   "
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={
                  e?.cover_image ||
                  `https://api.dicebear.com/9.x/initials/png?seed=${e?.name}`
                }
                width={32}
                height={32}
                className="rounded-full w-8 h-8"
                alt=""
              />
              <h1 className="text-sm text-[#2D3748] font-medium ">
                {truncate(e.name, { length: 30 })}
              </h1>
            </div>
            <h1 className="text-sm text-[#2D3748] capitalize font-medium ">
              {e.type}
            </h1>
            <h1 className="text-sm text-[#2D3748] font-medium ">
              {e.date || "NIL"}
            </h1>
            <h1 className="text-sm text-[#2D3748] font-medium ">
              {moment(e.created_at).format("ll")}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
