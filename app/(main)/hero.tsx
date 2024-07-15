"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import Image from "next/image";
import { Heart } from "iconsax-react";

const Hero = () => {
  return (
    <div className="h-screen md:h-[calc(100vh-70px)] relative w-full">
      <div className="contain h-full grid gap-x-20 items-center grid-cols-2">
        <div className=" space-y-12 ">
          <div className="space-y-6">
            <h1 className="text-[40px] font-bold leading-[60px] font-Playfair  ">
              Where Digital Meets Physical
            </h1>
            <h2 className="text-xl leading-[45px]">
              We are a curated marketplace bridging the gap between creators and
              collectors
            </h2>
          </div>
          <div className="flex justify-between max-w-[486px] items-center">
            <Button text="Explore Marketplace" textStyles="w-[183px]" />
            <Button text="Become a Creathor" textStyles="w-[183px]" />
          </div>
        </div>
        <div className="space-y-12">
          <div className="space-y-[15px]">
            <div className="bg-grayTwo p-5 ">
              <div className="relative w-full  h-[330px]  ">
                <Image
                  src="/featured.png"
                  fill
                  className="object-cover"
                  alt="featured"
                />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <h1 className="text-lg font-medium  text-mainGray">
                  Okechi Emezue
                </h1>
                <h1 className="font-Playfair font-bold text-2xl ">
                  Artwork Name
                </h1>
                <h1 className="font-bold text-navyBlue text-xl">
                  34 CGT (49 USD)
                </h1>
              </div>
              <div className="flex items-center space-x-3 ">
                <Heart size="24" color="#000" variant="Outline" />
                <h1 className="font-bold text-xl">2</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-start">
            <div className="flex items-center space-x-14">
              <Icon
                icon="dashicons:arrow-left-alt2"
                className="text-mainGray !text-2xl "
              />
              <Icon
                icon="dashicons:arrow-right-alt2"
                className="text-mainGray !text-2xl "
              />
            </div>
            {/* <div className="w-14 h-14 cursor-pointer rounded-full bg-grayTwo justify-center items-center flex ">
              <Icon
                icon="material-symbols:contact-support"
                className="!text-[32px]"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
