"use client";
import { getAdminArtworks } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { truncate } from "lodash";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  artworks,
}: {
  artworks: Awaited<ReturnType<typeof getAdminArtworks>>;
}) => {
  const router = useRouter();
  return (
    <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
      <div className="grid grid-cols-4 w-full bg-grayTwo py-4 px-6   ">
        {[
          {
            title: "Art Name",
            icon: "material-symbols:person",
          },
          {
            title: "Creator",
            icon: "ph:bank-fill",
          },
          {
            title: "Art Price",
            icon: "clarity:date-solid",
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
        {artworks?.data?.map((artwork, index) => (
          <div
            key={index}
            onClick={() => router.push(`/admin/artworks/${artwork.id}`)}
            className="grid grid-cols-4 w-full h-auto cursor-pointer hover:bg-gray-50/70  py-4 px-6   "
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={
                  artwork.art_image ||
                  `https://api.dicebear.com/9.x/initials/png?seed=${artwork?.name}`
                }
                width={32}
                height={32}
                className="rounded-full w-8 h-8"
                alt=""
              />
              <h1 className="text-sm text-[#2D3748] font-medium ">
                {truncate(artwork.name, { length: 20 })}
              </h1>
            </div>
            <h1 className="text-sm text-[#2D3748] font-medium ">
              {artwork?.user?.username}
            </h1>
            <h1 className="text-sm text-[#2D3748] font-medium ">
              {`USDC ${artwork?.floor_price?.toLocaleString()}`}
            </h1>
            <h1 className="text-sm text-[#2D3748] font-medium ">
              {moment(artwork.created_at).format("ll")}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
