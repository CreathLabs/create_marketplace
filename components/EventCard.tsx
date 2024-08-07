"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  event: {
    image: string;
    title: string;
    description: string;
    gate_fee: string;
    location: string;
    date: string;
  };
}

const EventCard: React.FC<{}> = () => {
  const [hoverd, setHovered] = useState(false);

  const router = useRouter();
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push("/exhibitions/dwewe23re3r2refd2wef")}
      className=" relative w-full h-[293px] md:h-[434px] overflow-hidden cursor-pointer "
    >
      <Image
        src="/event.png"
        fill
        className={`object-cover transition-all  ease-in-out duration-500 ${
          hoverd ? "scale-105" : ""
        } `}
        alt="Blog_image"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-[#000000CC] text-white flex items-end px-3 md:px-[52px] ">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <h1 className=" font-Playfair text-2xl md:text-[32px] font-bold ">
            Two Boys, One Lambo
          </h1>
        </div>
        <div className=" py-4  md:py-8 w-full grid grid-cols-3 divide-x-2 divide-white ">
          <div className="w-full flex flex-col items-center">
            <h1 className="font-semibold text-sm md:text-lg leading-[20px] md:leading-[45px] text-center ">
              Available Art
            </h1>
            <h1 className="font-bold text-lg md:text-2xl leading-[45px] text-center ">
              12
            </h1>
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="font-semibold text-sm md:text-lg leading-[20px] md:leading-[45px] text-center ">
              Sold Art
            </h1>
            <h1 className="font-bold text-lg md:text-2xl leading-[45px] text-center ">
              2
            </h1>
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="font-semibold text-sm md:text-lg leading-[20px] md:leading-[45px] text-center ">
              Total Sales
            </h1>
            <h1 className="font-bold text-lg md:text-2xl leading-[45px] text-center ">
              5.5 CGT
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
