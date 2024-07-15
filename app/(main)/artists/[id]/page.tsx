"use client";
import NftCard from "@/components/NftCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const tabs = ["Created", "Collected", "Likes"];

const AritistDetails = () => {
  const active = "Created";

  return (
    <div className="w-full h-full space-y-[193px] ">
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
        <div className="w-full space-y-4">
          <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
            Alfredoakinmade
          </h1>
          <div className="flex justify-between w-full">
            <h3 className="font-semibold text-xl leading-9 tracking-[5%] max-w-[50%]  ">
              Lorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect leut
              wefLorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect
              leut wefLorem Ipsum
            </h3>
            <div className="flex flex-col items-end space-y-14">
              <div className="flex gap-x-10 divide-x ">
                <div className="flex space-x-6 items-center">
                  <h1 className="font-bold text-[25px] ">6</h1>
                  <h1 className="font-semibold text-lg">Minted Artworks</h1>
                </div>
                <div className="flex space-x-6 pl-10 items-center">
                  <h1 className="font-bold text-[25px] ">62</h1>
                  <h1 className="font-semibold text-lg">Collectors</h1>
                </div>
              </div>
              <div className="flex items-center space-x-12 ">
                <Icon
                  icon="ant-design:instagram-filled"
                  className="text-[26px]"
                />
                <Icon
                  icon="ant-design:twitter-outlined"
                  className="text-[26px]"
                />
              </div>
            </div>
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

export default AritistDetails;
