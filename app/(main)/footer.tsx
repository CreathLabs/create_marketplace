"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const links = [
  { name: "Blog", url: "/blogs" },
  { name: "Terms & Conditions", url: "/terms" },
  { name: "Shipping and Delivery", url: "/shipping" },
];

const Footer = () => {
  const router = useRouter();



  return (
    <div className="bg-black pb-8 pt-14">
      <div className="contain flex flex-col items-center space-y-16 ">
        <Image src="/logo2.svg" width={115} height={63.55} alt="" />
        <div className="w-full  space-y-14 flex flex-col items-center">
          <div className="w-full max-w-[184px] mx-auto lg:max-w-[80%] lg:mx-0 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x  divide-white/20 border-b border-white/20">
            {links.map((item, index) => (
              <div
                key={index}
                className="py-6 lg:py-[14px] w-full flex justify-center text-white "
                onClick={()=>(router.push(item.url))}
              >
                <h1 className="leading-[45px] font-medium text-base lg:text-lg cursor-pointer">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center w-full space-y-12 ">
            <div className="flex items-center gap-x-8 lg:gap-x-28">
              <Icon
                icon="ant-design:instagram-filled"
                className="text-white text-2xl lg:text-[26px]"
              />
              <Icon
                icon="ant-design:twitter-outlined"
                className="text-white text-2xl lg:text-[26px]"
              />
              <Icon
                icon="dashicons:linkedin"
                className="text-white text-2xl lg:text-[26px]"
              />
              <Icon
                icon="bi:discord"
                className="text-white text-2xl lg:text-[26px]"
              />
              <Icon
                icon="carbon:logo-medium"
                className="text-white text-2xl lg:text-[26px]"
              />
            </div>
            <h1 className="font-medium text-white text-sm lg:text-base leading-[45px] ">
              © 2024 Creath. All Rights Reserved
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
