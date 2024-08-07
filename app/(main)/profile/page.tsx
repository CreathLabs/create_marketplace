"use client";
import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const tabs = ["Created", "Collected", "Likes"];

const UserProfile = () => {
  const active = "Created";

  return (
    <div className="w-full h-full  ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src="/artist_cover.png"
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain ">
          <div className="bg-grayTwo relative w-[264px]  h-[264px] ">
            <Image
              src="/featured.png"
              fill
              alt="Image"
              className="object-cover p-5"
            />
          </div>
        </div>
      </div>
      <div className="contain space-y-[105px] ">
        <div className="w-full grid grid-cols-2 gap-x-20 ">
          <div className="w-full space-y-4 mt-[193px]  ">
            <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
              Generated UserName
            </h1>
            <div className="space-y-6">
              <h3 className="font-semibold text-xl leading-9 tracking-[5%]  ">
                Lorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect leut
                wefLorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect
                leut wefLorem Ipsum
              </h3>
              <div className="w-full flex items-center gap-x-20 ">
                <Button text="Upload Artwork" textStyles="w-[183px]" />
                <Button text="Edit Profile" textStyles="w-[183px]" />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-grayTwo p-8 space-y-[60px] ">
            <DashStat title="DashStat" value="$ 20.59" />
            <DashStat title="CGT Balance" value="$ 240.59" />
            <DashStat title="Collector’s Royalty" value="$ 240,599,988" />
          </div>
        </div>

        <div className="pb-[98px] space-y-6">
          <div className="flex space-x-24 items-center">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`px-1 pb-3 ${
                  active === item ? "border-b-2 border-black" : "border-none"
                } `}
              >
                <h1
                  className={` text-xl ${
                    active === item ? "text-black" : "text-mainGray"
                  }  leading-[30px] font-semibold `}
                >
                  {item}
                </h1>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-10">
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

const DashStat = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between items-center ">
      <div className="space-y-4">
        <h2 className="font-bold text-base ">{title}</h2>
        <h1 className="font-Playfair text-[26px] font-bold ">{value}</h1>
      </div>
      <div className="flex gap-x-12 items-center">
        <div className="space-y-6 flex flex-col items-center ">
          <Icon icon="dashicons:arrow-down-alt2" className="!text-2xl" />
          <h1 className="font-sm font-semibold ">Receive</h1>
        </div>
        <div className="space-y-6 flex flex-col items-center ">
          <Icon icon="dashicons:arrow-up-alt2" className="!text-2xl" />
          <h1 className="font-sm font-semibold ">Send</h1>
        </div>
      </div>
    </div>
  );
};
