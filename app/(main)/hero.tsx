"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import Image from "next/image";
import { Heart } from "iconsax-react";

const Hero = () => {
  return (
    <div className="h-full lg:h-[calc(100vh-70px)] relative w-full">
      <div className="contain h-full grid pt-12 lg:py-0 gap-y-12 lg:gap-x-20 items-center lg:grid-cols-2">
        <div className=" space-y-8 lg:space-y-12 ">
          <div className=" space-y-3 lg:space-y-6">
            <h1 className="text-[28px] md:text-[40px] font-bold leading-[60px] text-center lg:text-left font-Playfair  ">
              Where Digital Meets Physical
            </h1>
            <h2 className="text-lg md:text-xl text-center lg:text-left leading-[45px]">
              We are a curated marketplace <br className="lg:hidden" /> bridging
              the gap between creators <br className="lg:hidden" /> and
              collectors
            </h2>
          </div>
          <div className="flex gap-x-7 justify-center lg:justify-between max-w-[486px] mx-auto lg:mx-0  items-center">
            <Button text="Explore Marketplace" textStyles="lg:w-[183px]" />
            <Button text="Become a Creathor" textStyles="lg:w-[183px]" />
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
                <h1 className=" text-base md:text-lg font-medium  text-mainGray">
                  Okechi Emezue
                </h1>
                <h1 className="font-Playfair font-bold text-xl md:text-2xl ">
                  Artwork Name
                </h1>
                <h1 className="font-bold text-navyBlue text-base md:text-xl">
                  34 CGT (49 USD)
                </h1>
              </div>
              <div className="flex items-center space-x-3 ">
                <Heart
                  size={24}
                  color="#000"
                  variant="Outline"
                  className="hidden md:block"
                />
                <Heart
                  size={20}
                  color="#000"
                  variant="Outline"
                  className="md:hidden"
                />
                <h1 className="font-bold text-base md:text-xl">2</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-start">
            <div className="flex w-full items-center justify-center lg:justify-start space-x-14">
              <Icon
                icon="dashicons:arrow-left-alt2"
                className="text-mainGray text-lg md:text-2xl "
              />
              <Icon
                icon="dashicons:arrow-right-alt2"
                className="text-mainGray text-lg md:text-2xl "
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
