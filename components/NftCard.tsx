"use client";
import { Art } from "@prisma/client";
import { Heart } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NftCard: React.FC<Art> = ({
  id,
  art_image,
  published_by,
  name,
  floor_price,
}) => {
  const router = useRouter();
  const ext = art_image?.split(".");
  const isVideo =
    ext?.[ext.length - 1] && ext?.[ext.length - 1]?.includes("mp4");

  return (
    <div
      className="w-full min-w-[323px] h-full  space-y-4 cursor-pointer "
      onClick={() => router.push(`/marketplace/products/${id}`)}
    >
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        {!isVideo ? (
          <Image
            src={art_image || "/featured.png"}
            fill
            alt="Image"
            className="object-cover p-5"
          />
        ) : (
          <video
            src={art_image!}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover  p-5 absolute"
          />
        )}
      </div>
      <div className="space-y-2 md:space-y-3">
        <h1 className="text-mainGray text-base md:text-[17px]">
          {published_by}
        </h1>
        <div className="space-y-3 md:space-y-4">
          <h1 className=" text-xl md:text-[22px] font-Playfair font-black ">
            {name}
          </h1>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-navyBlue text-base md:text-lg font-bold ">
              {`${floor_price} CGT (49 USD)`}
            </h1>
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
      </div>
    </div>
  );
};

export default NftCard;
