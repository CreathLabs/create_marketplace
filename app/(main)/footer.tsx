"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const links = [
  { name: "Become a Creator", url: "" },
  { name: "Blog", url: "" },
  { name: "Resources", url: "" },
  { name: "Terms & Conditions", url: "" },
  { name: "Shipping & Delivery", url: "" },
];

const Footer = () => {
  return (
    <div className="bg-black pb-8 pt-14">
      <div className="contain flex flex-col items-center space-y-16 ">
        <Image src="/logo2.svg" width={115} height={63.55} alt="" />
        <div className="w-full  space-y-14 ">
          <div className="w-full grid grid-cols-5 divide-x divide-white/20 border-b border-white/20">
            {links.map((item, index) => (
              <div
                key={index}
                className="py-[14px] w-full flex justify-center text-white "
              >
                <h1 className="leading-[45px] font-medium text-lg ">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center w-full space-y-12 ">
            <div className="flex items-center gap-x-28">
              <Icon
                icon="ant-design:instagram-filled"
                className="text-white text-[26px]"
              />
              <Icon
                icon="ant-design:twitter-outlined"
                className="text-white text-[26px]"
              />
              <Icon
                icon="dashicons:linkedin"
                className="text-white text-[26px]"
              />
              <Icon icon="bi:discord" className="text-white text-[26px]" />
              <Icon
                icon="carbon:logo-medium"
                className="text-white text-[26px]"
              />
            </div>
            <h1 className="font-medium text-white text-base leading-[45px] ">
              © 2024 Creath. All Rights Reserved
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
