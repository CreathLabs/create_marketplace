import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import { Heart, InfoCircle, LoginCurve } from "iconsax-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full">
      <div className="h-full  relative grid lg:grid-cols-2">
        <div className="w-full lg:max-h-[calc(100vh-70px)] h-[398px] lg:h-[695px] bg-grayTwo flex justify-end ">
          <div className="contain_right ">
            <div className="w-full h-full relative ">
              <Image
                src="/featured.png"
                fill
                alt=""
                className="object-cover p-4 lg:py-20 lg:pr-20"
              />
            </div>
          </div>
        </div>
        <div className="w-full  h-full">
          <div className="w-full bg-black text-white ">
            <div className="contain_left py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12">
              <div className="flex items-end lg:items-center justify-between ">
                <div className="space-y-6">
                  <h1 className=" text-[22px] lg:text-3xl leading-[48px] font-Playfair font-bold ">
                    Artwork Name
                  </h1>
                  <h2 className="text-base lg:text-lg  font-medium ">
                    By Okechi Emezue
                  </h2>
                </div>
                <div className="flex items-center space-x-3 ">
                  <Heart
                    size={24}
                    variant="Outline"
                    className="hidden md:block"
                  />
                  <Heart size={20} variant="Outline" className="md:hidden" />
                  <h1 className="font-bold text-base md:text-xl">2</h1>
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-base lg:text-lg font-medium ">
                  Floor Price
                </h1>
                <h1 className="font-bold text-lg lg:text-xl leading-9 ">
                  34 CGT (49 USD)
                </h1>
              </div>
              <div className="flex items-center justify-between lg:justify-start lg:gap-x-14">
                <Button
                  text="Buy  Now"
                  textStyles=" w-[144px] lg:w-[183px]"
                  className="text-white border-white"
                />
                <Button
                  text="Make an Offer"
                  textStyles=" w-[144px] lg:w-[183px]"
                  className="text-white border-white"
                />
              </div>
              <div className="flex justify-center lg:justify-start items-center gap-x-12">
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
          <div className="contain_left  py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12 lg:space-y-16">
            <div className="space-y-6">
              <h1 className=" text-xl lg:text-[27px] lg:leading-[48px] font-Playfair font-bold ">
                Description
              </h1>
              <h2 className=" text-base lg:text-xl leading-[36px]  font-medium ">
                Lorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect leut
                wefLorem Ipsum Dolor consect leut wef
              </h2>
            </div>
            <div className=" space-y-8 lg:space-y-10">
              <TitleValue title="Medium" value="Digital AI" />
              <TitleValue title="Location" value="Lagos, Nigeria" />
              <TitleValue title="Token ID" value="345" />
              <TitleValue title="Dimensions" value="56”  X  56”" />
              <TitleValue title="Contract" value="0x3467.....6779" />
              <TitleValue title="Published by" value="One Art gallery" />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-14 space-y-8">
        <div className="contain flex justify-between items-center">
          <h1 className="font-Playfair font-bold text-xl lg:text-[40px] ">
            More Artworks From Creath
          </h1>
          <Button
            text="Explore Marketplace"
            textStyles="w-[183px]"
            className="hidden lg:flex"
          />
        </div>
        <div className="container max-w-screen-xl mx-auto pl-6 ">
          <div className="w-full scroller flex gap-x-8 lg:gap-x-10 overflow-x-auto">
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
          </div>
        </div>
        <div className="w-full flex justify-center lg:hidden">
          <Button text="Explore Marketplace" textStyles="w-[144px]" />
        </div>
      </div>
    </div>
  );
};

export default page;

const TitleValue = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <h1 className=" text-base lg:text-lg font-medium  ">{title}</h1>
      <h1 className=" text-base lg:text-xl font-bold leading-9 ">{value}</h1>
    </div>
  );
};
