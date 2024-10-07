import React from "react";
import { getAdminCollectibles } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import moment from "moment";
import Header from "../header";
import { truncate } from "lodash";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

const CollectoiblesPage = async () => {
  const collectibles = await getAdminCollectibles();

  if (!collectibles) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Collectibles" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              Collectibles Listing
            </h1>
            <div>
              <Button
                text="Add New"
                action={async () => {
                  "use server";
                  redirect("/admin/collectibles/create");
                }}
                textStyles="text-[13px]"
                className="py-2 w-[106px]  rounded-full border-none bg-black text-white"
              />
            </div>
          </div>

          <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
            <div className="grid grid-cols-5 w-full bg-grayTwo py-4 px-6   ">
              {[
                {
                  title: "Collectibles Name",
                  icon: "material-symbols:person",
                },
                {
                  title: "Publisher",
                  icon: "ph:bank-fill",
                },
                {
                  title: "Total Minted",
                  icon: "heroicons:identification-20-solid",
                },
                {
                  title: "Mint Price",
                  icon: "clarity:date-solid",
                },
                {
                  title: "Creation Date",
                  icon: "clarity:date-solid",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center space-x-2 "
                >
                  <Icon icon={item.icon} className="!text-base" />
                  <h1 className="font-bold text-sm">{item.title}</h1>
                </div>
              ))}
            </div>
            <div className="">
              {collectibles?.data?.map((collectible, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 w-full h-auto  py-4 px-6   "
                >
                  <div className="flex items-center gap-x-3">
                    <Image
                      src={
                        collectible.image ||
                        `https://api.dicebear.com/9.x/initials/png?seed=${collectible?.name}`
                      }
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8"
                      alt=""
                    />
                    <h1 className="text-sm text-[#2D3748] font-medium ">
                      {truncate(collectible.name, { length: 20 })}
                    </h1>
                  </div>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {collectible?.published_by}
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {collectible?.total_minted}
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {`USDC ${collectible?.mint_price?.toLocaleString()}`}
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {moment(collectible.created_at).format("ll")}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectoiblesPage;
