import Button from "@/components/Button";
import Collectible from "@/components/Collectible";
import NftCard from "@/components/NftCard";
import { Heart, InfoCircle, LoginCurve } from "iconsax-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full">
      <div className="h-full  relative grid grid-cols-2">
        <div className="w-full max-h-[calc(100vh-70px)] h-[695px] bg-grayTwo flex justify-end ">
          <div className="contain_right ">
            <div className="w-full h-full relative ">
              <Image
                src="/collectible.png"
                fill
                alt=""
                className="object-cover py-20 pr-20"
              />
            </div>
          </div>
        </div>
        <div className="w-full  h-full">
          <div className="w-full bg-black text-white ">
            <div className="contain_left  pl-12 !pr-12 pb-10 pt-20 space-y-12">
              <div className="flex items-center justify-between ">
                <div className="space-y-6">
                  <h1 className="text-3xl leading-[48px] font-Playfair font-bold ">
                    Collectible Name
                  </h1>
                  <h2 className="text-lg  font-medium ">Four (4) Per Wallet</h2>
                </div>
                <div className="flex items-center space-x-3 ">
                  <Heart size="24" variant="Outline" />
                  <h1 className="font-bold text-2xl">2</h1>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-lg font-medium ">Mint Price</h1>
                <h1 className="font-bold text-xl leading-9 ">
                  34 CGT (49 USD)
                </h1>
              </div>

              <Button
                text="Mint  Now"
                textStyles="w-[183px]"
                className="text-white border-white"
              />
              <div className="flex items-center gap-x-12">
                <div className="flex flex-col items-center space-y-3">
                  <div className=" w-12 h-12 bg-white text-black flex items-center justify-center ">
                    <InfoCircle variant="Outline" />
                  </div>
                  <h3 className="text-sm font-semibold text-white text-center ">
                    Flag
                  </h3>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className=" w-12 h-12 bg-white text-black flex items-center justify-center ">
                    <LoginCurve variant="Outline" />
                  </div>
                  <h3 className="text-sm font-semibold text-white text-center ">
                    Share
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="contain_left  pl-12 !pr-12 pb-12 pt-8 space-y-16">
            <div className="space-y-6">
              <h1 className="text-[27px] leading-[48px] font-Playfair font-bold ">
                Description
              </h1>
              <h2 className="text-xl leading-[36px]  font-medium ">
                Lorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect leut
                wefLorem Ipsum Dolor consect leut wef
              </h2>
            </div>
            <div className="space-y-10">
              <TitleValue title="Medium" value="Digital AI" />
              <TitleValue title="Collectors" value="456" />
              <TitleValue title="Total Minted" value="345" />
              <TitleValue title="Remaining" value="56”" />
              <TitleValue title="Contract" value="0x3467.....6779" />
              <TitleValue title="Published by" value="One Art gallery" />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-14 space-y-8">
        <div className="contain flex justify-between items-center">
          <h1 className="font-Playfair font-bold !text-[40px] ">
            More Collectibles
          </h1>
          <Button text="Explore Marketplace" textStyles="w-[183px]" />
        </div>
        <div className="container max-w-screen-xl mx-auto pl-6 ">
          <div className="w-full scroller flex gap-x-10 overflow-x-auto">
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

const TitleValue = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <h1 className="text-lg font-medium  ">{title}</h1>
      <h1 className="text-xl font-bold leading-9 ">{value}</h1>
    </div>
  );
};
