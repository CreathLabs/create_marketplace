import { getAllUserCollectibleLikes } from "@/actions";
import { Collectibles } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LikeButton } from "./buttons";

interface CollectibleProps extends Collectibles {
  likesCount?: number;
}

const Collectible: React.FC<CollectibleProps> = async ({
  image,
  id,
  name,
  published_by,
  total_minted,
  mint_price,
  total_unminted,
  likesCount = 0,
}) => {
  const allLikes = await getAllUserCollectibleLikes();

  const isLiked = !!allLikes?.find((i) => i.collectible_id === id);

  return (
    <div className="w-full min-w-[323px] h-full space-y-4 cursor-pointer">
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        <Image
          src={image || "/collectible.png"}
          fill
          alt="Image"
          className="object-cover p-5"
        />
      </div>
      <div className="space-y-3">
        <Link href={`/collectibles/${id}`}>
          <h1 className="text-xl md:text-[22px] font-Playfair font-black ">
            {name}
          </h1>
        </Link>

        <div className="space-y-3 md:space-y-4">
          <h1 className="text-mainGray font-medium text-base md:text-[17px]">
            {published_by}
          </h1>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-navyBlue text-base md:text-lg font-bold ">
              {`${total_minted}/${total_minted + total_unminted} Minted`}
            </h1>
            <LikeButton
              id={id}
              isLiked={isLiked}
              likesCount={likesCount}
              type="collectible"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collectible;
