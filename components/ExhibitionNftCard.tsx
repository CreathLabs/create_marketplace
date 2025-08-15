"use client";
import { Art } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteButton } from "./buttons";
import { usePathname } from "next/navigation";

interface ArtProps extends Art {}

const ExhibitionNftCard: React.FC<ArtProps> = ({
  id,
  art_image,
  name,
  floor_price,
  exhibition_id,
}) => {
  const pathname = usePathname();

  const ext = art_image?.split(".");
  const isVideo =
    ext?.[ext.length - 1] && ext?.[ext.length - 1]?.includes("mp4");

  const isAdmin = pathname.includes("admin");

  const getTransformedImage = (img?: string) => {
    if (!img || !img.includes("media.publit.io")) return img;

    const file = img.substr(0, img.lastIndexOf(".")) + ".webp";
    const adding = "q_80,w_600,h_600,c_fill/";
    const newString = file.slice(0, 29) + adding + file.slice(29);
    return newString;
  };

  return (
    <div className="w-full min-w-[323px] h-full  space-y-4 cursor-pointer ">
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        {!isVideo ? (
          <Image
            src={getTransformedImage(art_image || undefined) || "/featured.png"}
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
            playsInline
            className="w-full h-full object-cover  p-5 absolute"
          />
        )}
      </div>
      <div className="space-y-2 md:space-y-3">
        <div className="space-y-3 md:space-y-4">
          <Link
            href={
              isAdmin
                ? `/admin/exhibitions/${exhibition_id}/artworks/${id}`
                : `/exhibitions/${exhibition_id}/artworks/${id}`
            }
          >
            <h1 className=" text-xl md:text-[22px] font-Playfair font-black ">
              {name}
            </h1>
          </Link>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-black text-base md:text-lg font-bold ">
              {`${floor_price} USDC`}
            </h1>
            {isAdmin && <DeleteButton id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionNftCard;
