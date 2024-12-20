import { getAllUserLikes } from "@/actions";
import { Art } from "@prisma/client";
import { Heart } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LikeButton } from "./buttons";

interface ArtProps extends Art {
  likesCount: number;
}

const NftCard: React.FC<ArtProps> = async ({
  id,
  art_image,
  published_by,
  name,
  floor_price,
  likesCount,
}) => {
  const allLikes = await getAllUserLikes();
  const ext = art_image?.split(".");
  const isVideo =
    ext?.[ext.length - 1] && ext?.[ext.length - 1]?.includes("mp4");

  const isLiked = !!allLikes?.find((i) => i.art_id === id);

  return (
    <div className="w-full min-w-[323px] h-full  space-y-4 cursor-pointer ">
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
          <Link href={`/marketplace/products/${id}`}>
            <h1 className=" text-xl md:text-[22px] font-Playfair font-black ">
              {name}
            </h1>
          </Link>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-navyBlue text-base md:text-lg font-bold ">
              {`${floor_price} CGT (49 USD)`}
            </h1>
            <LikeButton likesCount={likesCount} isLiked={isLiked} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
