import { getArtist } from "@/actions";
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

  return (
    <div className="w-full h-full space-y-5 min-h-[calc(100vh-70px)]  ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src={"/artist_cover.png"}
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
        <div className="w-full grid grid-cols-1 gap-y-8 lg:gap-y-0  lg:gap-x-24 lg:grid-cols-2 space-y-4">
          <div className="space-y-8 pt-[160px] ">
            <div className="space-y-4">
              <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
                {data.username}
              </h1>
              <h3 className="font-semibold text-xl leading-9 tracking-[5%] w-full md:w-full ">
                {data.bio && data.bio?.length > 300
                  ? `${data.bio.substring(0, 300)}...`
                  : data.bio || "My bio"}
              </h3>
            </div>
            <div className="flex flex-col lg:items-start md:items-center sm:items-center">
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
            </div>
          </div>
          <div className=" bg-grayTwo h-full py-6 px-4 lg:p-8 space-y-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Location</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                {`${data.state}, ${data.country}`}
              </h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Address</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                {`${data.address}`}
              </h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Social Media</h3>
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
