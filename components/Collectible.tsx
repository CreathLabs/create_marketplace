import { Heart } from "iconsax-react";
import Image from "next/image";
import React from "react";

const Collectible = () => {
  return (
    <div className="w-full h-full space-y-4">
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        <Image
          src="/collectible.png"
          fill
          alt="Image"
          className="object-cover"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-[22px] font-Playfair font-black ">
          Batman Grey 1258
        </h1>

        <div className="space-y-4">
          <h1 className="text-mainGray font-medium text-[17px]">DC Comics</h1>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-navyBlue text-lg font-bold ">32/32 Minted</h1>
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

export default Collectible;
