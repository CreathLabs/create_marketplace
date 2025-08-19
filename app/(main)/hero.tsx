"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import Image from "next/image";
import { Art } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LikeButton } from "@/components/buttons";
import { getAllUserLikes } from "@/actions";

interface ArtProps extends Art {
  likesCount: number;
}

const Hero: React.FC<{
  topNfts: ArtProps[];
  allLikes: Awaited<ReturnType<typeof getAllUserLikes>>;
}> = ({ topNfts, allLikes }) => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    if (current < 5) {
      setCurrent((c) => c + 1);
    } else {
      setCurrent(0);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    } else {
      setCurrent(5);
    }
  };

  const id = topNfts?.[current]?.id;

  return (
    <div className="h-full lg:h-[calc(100vh-70px)] relative w-full">
      <div className="contain h-full grid pt-12 lg:py-0 gap-y-12 lg:gap-x-20 items-center lg:grid-cols-2">
        <div className=" space-y-8 lg:space-y-12 ">
          <div className=" space-y-3 lg:space-y-6">
            <h1 className="text-[28px] md:text-[40px] font-bold leading-[60px] text-center lg:text-left font-Playfair  ">
             The New Frontier For Art and Collectibles
            </h1>
            <h2 className="text-lg md:text-xl text-center lg:text-left leading-[45px]">
              We are a curated marketplace <br className="lg:hidden" /> bridging
              the gap between creators <br className="lg:hidden" /> and
              collectors
            </h2>
          </div>
          <div className="flex gap-x-7 justify-center lg:justify-between max-w-[486px] mx-auto lg:mx-0  items-center">
            <Button
              text="Explore Marketplace"
              textStyles="lg:w-[183px]"
              action={() => router.push("/marketplace")}
            />
          </div>
        </div>
        <div className="space-y-12">
          <div className="space-y-[15px]">
            <div className="bg-grayTwo p-5 ">
              <div className="relative w-full  h-[330px]  ">
                <Image
                  src={topNfts?.[current]?.art_image || "/featured.png"}
                  fill
                  className="object-cover"
                  alt="featured"
                />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <h1 className=" text-base md:text-lg font-medium  text-mainGray">
                  {topNfts?.[current]?.published_by}
                </h1>
                <h1
                  onClick={() =>
                    router.push(
                      `/marketplace/products/${topNfts?.[current]?.id}`
                    )
                  }
                  className="font-Playfair cursor-pointer font-bold text-xl md:text-2xl "
                >
                  {topNfts?.[current]?.name}
                </h1>
                <h1 className="font-bold text-black text-base md:text-xl">
                  {`${topNfts?.[current]?.floor_price} USDC`}
                </h1>
              </div>
              <LikeButton
                id={id}
                isLiked={!!allLikes?.find((i) => i.art_id === id)}
                likesCount={topNfts?.[current]?.likesCount}
              />
            </div>
          </div>
          <div className="flex justify-between w-full items-start">
            <div className="flex w-full items-center justify-center lg:justify-start space-x-14">
              <Icon
                icon="dashicons:arrow-left-alt2"
                className="text-mainGray cursor-pointer text-lg md:text-2xl "
                onClick={prev}
              />
              <Icon
                icon="dashicons:arrow-right-alt2"
                className="text-mainGray cursor-pointer text-lg md:text-2xl "
                onClick={next}
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
