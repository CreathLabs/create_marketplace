import { getArtist } from "@/actions";
import EmptyComponent from "@/components/EmptyComponent";
import NftCard from "@/components/NftCard";
import UserTabs from "@/components/UserTabs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Art } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const tabs = [
  {
    name: "Created",
    value: "artworks",
  },
  {
    name: "Collected",
    value: "collected",
  },
  {
    name: "Likes",
    value: "likes",
  },
];

const AritistDetails = async ({
  params: { id },
  searchParams: { tab },
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) => {
  let data = null;
  try {
    const res = await getArtist(id);
    data = res;
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    redirect("/");
  }

  const isEmpty =
    (data[(tab as keyof typeof data) || "artworks"] as Art[])?.length ||
    0 === 0;

  return (
    <div className="w-full h-full space-y-[193px] min-h-[calc(100vh-70px)] ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src={data.cover_image || "/artist_cover.png"}
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain ">
          <div className="bg-grayTwo relative w-[264px]  h-[264px] ">
            <Image
              src={data.profile_image!}
              fill
              alt="Image"
              className="object-cover p-5"
            />
          </div>
        </div>
      </div>
      <div className="contain space-y-[105px] ">
        <div className="w-full md:flex-col  sm:flex-col space-y-4">
          <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
            {data.username}
          </h1>
          <div className="justify-between lg:flex md:flex-col sm:flex-col w-full">
            <h3 className="font-semibold text-xl leading-9 tracking-[5%] lg:max-w-[50%] sm:w-full md:w-full ">
              {data.bio && data.bio?.length > 300
                ? `${data.bio.substring(0, 300)}...`
                : data.bio || ""}
            </h3>
            <div className="flex flex-col lg:items-end md:items-center sm:items-center space-y-14">
              <div className="flex gap-x-10 divide-x lg:mt-0 mt-8">
                <div className="flex space-x-6 items-center">
                  <h1 className="font-bold text-[25px] ">6</h1>
                  <h1 className="font-semibold text-lg">Minted Artworks</h1>
                </div>
                <div className="flex space-x-6 pl-10 items-center">
                  <h1 className="font-bold text-[25px] ">62</h1>
                  <h1 className="font-semibold text-lg">Collectors</h1>
                </div>
              </div>
              <div className="flex items-center space-x-12 ">
                <Icon
                  icon="ant-design:instagram-filled"
                  className="text-[26px]"
                />
                <Icon
                  icon="ant-design:twitter-outlined"
                  className="text-[26px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-[98px] space-y-6">
          <UserTabs tab={tab || "artworks"} tabs={tabs} />
          {isEmpty && (
            <div className="py-16">
              <EmptyComponent
                text={
                  tab === "likes"
                    ? `Oops! ${data.username} has not liked any artwork`
                    : tab === "collected"
                    ? `Oops! ${data.username} has not made any purchases`
                    : `Oops! ${data.username} has not created any artwork`
                }
              />
            </div>
          )}
          <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8">
            {(data[(tab as keyof typeof data) || "artworks"] as Art[])?.map(
              (a) => (
                <NftCard key={a.id} {...a} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AritistDetails;
