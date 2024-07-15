"use client";
import { Heart } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NftCard = () => {
  const router = useRouter();
  return (
    <div
      className="w-full min-w-[323px] h-full  space-y-4 cursor-pointer "
      onClick={() => router.push("/products/dwewe23re3r2refd2wef")}
    >
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        <Image
          src="/featured.png"
          fill
          alt="Image"
          className="object-cover p-5"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-mainGray text-[17px]">Okechi Emezue</h1>
        <div className="space-y-4">
          <h1 className="text-[22px] font-Playfair font-black ">
            Artwork Name
          </h1>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-navyBlue text-lg font-bold ">
              34 CGT (49 USD)
            </h1>
            <div className="flex items-center space-x-3 ">
              <Heart size="24" color="#000" variant="Outline" />
              <h1 className="font-bold text-xl">2</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
