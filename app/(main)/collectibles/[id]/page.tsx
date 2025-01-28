import {
  getAllUserFlags,
  getAllUserLikes,
  getCollectible,
  getTopCollectibless,
} from "@/actions";
import Button from "@/components/Button";
import { FlagButton, LikeButton, ShareButton } from "@/components/buttons";
import Collectible from "@/components/Collectible";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let data = null;
  try {
    const res = await getCollectible(id);
    data = res;
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    redirect("/");
  }

  const topCollectiles = await getTopCollectibless();
  const allLikes = await getAllUserLikes();
  const allFlags = await getAllUserFlags();

  return (
    <div className="w-full h-full">
      <div className="h-full  relative grid lg:grid-cols-2">
        <div className="w-full lg:sticky lg:top-[70px] lg:max-h-[calc(100vh-70px)] h-[398px] lg:h-[695px] bg-grayTwo flex justify-end ">
          <div className="contain_right ">
            <div className="w-full h-full relative ">
              <Image
                src={data.image || "/featured.png"}
                fill
                alt=""
                className="object-cover p-4 lg:py-20 lg:pr-20"
              />
            </div>
          </div>
        </div>
        <div className="w-full  h-full">
          <div className="w-full bg-black text-white ">
            <div className="contain_left py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12">
              <div className="flex items-end lg:items-center justify-between ">
                <div className="space-y-6">
                  <h1 className="text-[22px] lg:text-3xl leading-[48px] font-Playfair font-bold ">
                    {data.name}
                  </h1>
                  <h2 className="text-base lg:text-lg  font-medium ">
                    {`Four (${data.mint_per_wallet}) Per Wallet`}
                  </h2>
                </div>
                <LikeButton
                  id={id}
                  isLiked={!!allLikes?.find((i) => i.art_id === id)}
                  likesCount={data.likesCount}
                />
              </div>
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-base lg:text-lg font-medium ">
                  Mint Price
                </h1>
                <h1 className="font-bold text-lg lg:text-xl leading-9 ">
                  {`${data.mint_price} USDC`}
                </h1>
              </div>

              <Button
                text="Mint  Now"
                textStyles="w-[144px] lg:w-[183px]"
                className="text-white border-white"
              />
              <div className="flex justify-center lg:justify-start items-center gap-x-12">
                <FlagButton
                  id={id}
                  isFlagged={!!allFlags?.find((i) => i.art_id === id)}
                  type="collectible"
                />
                <ShareButton title={data.name} type="collectible" />
              </div>
            </div>
          </div>
          <div className="contain_left  py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12 lg:space-y-16">
            <div className="space-y-6">
              <h1 className="text-xl lg:text-[27px] lg:leading-[48px] font-Playfair font-bold">
                Description
              </h1>
              <h2 className="text-base lg:text-xl leading-[36px]  font-medium ">
                {data.description}
              </h2>
            </div>
            <div className="space-y-8 lg:space-y-10">
              <TitleValue
                title="Total Minted"
                value={data.total_minted?.toString() || "0"}
              />
              <TitleValue
                title="Remaining"
                value={String(data.total_unminted)}
              />
              <TitleValue title="Contract" value={data.contract || ""} />
              <TitleValue title="Published by" value={data.published_by} />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-14 space-y-8">
        <div className="contain flex justify-between items-center">
          <h1 className="font-Playfair font-bold text-xl lg:text-[40px] ">
            More Collectibles
          </h1>
          <Button
            text="Explore Marketplace"
            textStyles="w-[183px]"
            className="hidden lg:flex"
          />
        </div>
        <div className="container max-w-screen-xl mx-auto pl-6 ">
          <div className="w-full scroller flex gap-x-8 lg:gap-x-10 overflow-x-auto">
            {topCollectiles.splice(0, 4).map((i) => (
              <Collectible key={i.id} {...i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

const TitleValue = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <h1 className="text-lg font-medium  ">{title}</h1>
      <h1 className="text-xl font-bold leading-9 ">{value}</h1>
    </div>
  );
};
