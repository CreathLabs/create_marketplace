import { getNft, getTopNfts } from "@/actions";
import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import VerifyButton from "@/app/providers/verifyNft";
import {
  getAllUserFlags,
  getAllUserLikes,
  getProfile,
} from "@/actions/current";
import { FlagButton, LikeButton, ShareButton } from "@/components/buttons";
import Link from "next/link";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let data = null;
  try {
    const res = await getNft(id);
    data = res;
    console.log(res)
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    redirect("/");
  }

  let current = null;
  try {
    const res = await getProfile();
    current = res;
  } catch (error) {
    console.log(error);
  }

  const topNfts = await getTopNfts();
  const allLikes = await getAllUserLikes();
  const allFlags = await getAllUserFlags();

  const ext = data.art_image?.split(".");
  const isVideo =
    ext?.[ext.length - 1] && ext?.[ext.length - 1]?.includes("mp4");

  return (
    <div className="w-full h-full">
      <div className="h-full  relative grid lg:grid-cols-2">
        <div className="w-full lg:sticky lg:top-[70px] lg:max-h-[calc(100vh-70px)] h-[398px] lg:h-[695px] bg-grayTwo flex justify-end ">
          <div className="contain_right ">
            <div className="w-full h-full relative ">
              {!isVideo ? (
                <Image
                  src={data.art_image || "/featured.png"}
                  fill
                  alt=""
                  className="object-cover p-4 lg:py-20 lg:pr-20"
                />
              ) : (
                <video
                  src={data.art_image!}
                  autoPlay
                  className="absolute w-full h-full object-cover p-4 lg:py-20 lg:pr-20"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full  h-full">
          <div className="w-full bg-black text-white ">
            <div className="contain_left py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12">
              <div className="flex items-end lg:items-center justify-between ">
                <div className="space-y-6">
                  <h1 className=" text-[22px] lg:text-3xl leading-[48px] font-Playfair font-bold ">
                    {data.name}
                  </h1>
                  <h2 className="text-base lg:text-lg  font-medium ">
                    {`By ${data.published_by}`}
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
                  Floor Price
                </h1>
                <h1 className="font-bold text-lg lg:text-xl leading-9 ">
                  {`${data.floor_price} USDC`}
                </h1>
              </div>
              <div className="flex items-center justify-between lg:justify-start lg:gap-x-14">
                <VerifyButton
                  nft_id={data.nft_id}
                  current={current}
                  price={data.floor_price.toString()}
                  Innertext="Buy With Crypto"
                  paymentType="Wallet"
                  artName={data.name}
                />
                <VerifyButton
                  nft_id={data.nft_id}
                  current={current}
                  price={data.floor_price.toString()}
                  Innertext="Buy With Fiat"
                  paymentType="Fiat"
                  artName={data.name}
                />
              </div>
              <div className="flex justify-center lg:justify-start items-center gap-x-12">
                <FlagButton
                  id={id}
                  isFlagged={!!allFlags?.find((i) => i.art_id === id)}
                />
                <ShareButton title={data.name} type="collectible" />
              </div>
            </div>
          </div>
          <div className="contain_left  py-8 px-4 lg:pl-12 lg:!pr-12 lg:pb-10 lg:pt-20 space-y-12 lg:space-y-16">
            <div className="space-y-6">
              <h1 className=" text-xl lg:text-[27px] lg:leading-[48px] font-Playfair font-bold ">
                Description
              </h1>
              <h2 className=" text-base lg:text-xl leading-[36px]  font-medium ">
                {data.description}
              </h2>
            </div>
            <div className=" space-y-8 lg:space-y-10">
              <TitleValue title="Medium" value={data.category?.name} />
              <TitleValue title="Location" value={data.location || ""} />
              <TitleValue title="Dimensions" value={data.dimensions} />
              {data.contract && (
                <TitleValue title="Contract" value={data.contract} />
              )}
              <TitleValue title="Published by" value={data.published_by!} />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-14 space-y-8">
        <div className="contain flex justify-between items-center">
          <h1 className="font-Playfair font-bold text-xl lg:text-[40px] ">
            More Artworks From Creath
          </h1>
          <Button
            text="Explore Marketplace"
            textStyles="w-[183px]"
            className="hidden lg:flex"
          />
        </div>
        <div className="container max-w-screen-xl mx-auto pl-6 ">
          <div className="w-full scroller flex gap-x-8 lg:gap-x-10 overflow-x-auto">
            {topNfts.map((n) => (
              <NftCard key={n.id} {...n} />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center lg:hidden">
          <Link href={"/marketplace"}>
            <Button text="Explore Marketplace" textStyles="w-[144px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

const TitleValue = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <h1 className=" text-base lg:text-lg font-medium  ">{title}</h1>
      <h1 className=" text-base lg:text-xl font-bold leading-9 ">{value}</h1>
    </div>
  );
};
