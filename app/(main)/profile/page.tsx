import { getProfile } from "@/actions";
import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import DashStat from "@/components/DashStat";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import UserTabs from "@/components/UserTabs";
import { Art, ExhibitionArt } from "@prisma/client";
import EmptyComponent from "@/components/EmptyComponent";
import Link from "next/link";
import GetNft from "@/components/GetNft";

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
const UserProfile = async ({
  searchParams: { tab },
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) => {
  let profile = null;
  try {
    const res = await getProfile();
    profile = res;
  } catch (error) {
    console.log(error);
  }
  

  if (!profile) {
    redirect("/");
  }

  const profileImage =
    profile?.profile_image ||
    `https://api.dicebear.com/9.x/initials/png?seed=${profile?.username}`;

  const isEmpty =
    ((profile[(tab as keyof typeof profile) || "artworks"] as Art[])?.length ||
      0) === 0;

  return (
    <div className="w-full h-full min-h-[calc(100vh-70px)] space-y-[80px] lg:space-y-[193px]  ">
      <div className="w-full h-[211px] lg:h-[345px] relative  ">
        <Image
          src={profile.cover_image || "/artist_cover.png"}
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain ">
          <div className="bg-grayTwo relative w-[123px] h-[120px] lg:w-[264px]  lg:h-[264px] ">
            <Image
              src={profileImage}
              fill
              alt="Image"
              className="object-cover p-2 lg:p-5"
            />
          </div>
        </div>
      </div>
      <div className="contain space-y-16 lg:space-y-[105px] ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-x-20 ">
          <div className="w-full space-y-4  ">
            <h1 className="font-Playfair font-bold text-[22px] lg:text-[35px] leading-[46px] ">
              {profile?.username}
            </h1>
            <div className="space-y-6">
              <h3 className="font-semibold text-base md:text-lg lg:text-xl leading-9 tracking-[5%]  ">
                {profile?.bio || "Your Bio goes here, Click below to edit"}
              </h3>
              <div className="w-full flex items-center gap-x-20 ">
                {profile.is_approved && (
                  <Button
                    text="Upload Artwork"
                    action={async () => {
                      "use server";
                      redirect("/profile/artworks/upload");
                    }}
                    textStyles="md:w-[183px]"
                    className="w-full lg:w-fit"
                  />
                )}

                <Button
                  text="Edit Profile"
                  action={async () => {
                    "use server";
                    redirect("/profile/edit");
                  }}
                  textStyles="md:w-[183px]"
                  className="w-full lg:w-fit"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-grayTwo p-8 space-y-[60px] ">
            <DashStat title="Wallet Balance" value="Balance" />
            <DashStat title="Collector’s Royalty" value="Royalty" />
            <GetNft/>
          </div>
        </div>

        <div className="pb-[98px] space-y-6">
          <UserTabs tab={tab || "artworks"} tabs={tabs} />
          {isEmpty && (
            <div className="py-16">
              <EmptyComponent
                text={
                  tab === "likes"
                    ? "Oops! You have not liked any artwork"
                    : tab === "collected"
                    ? "Oops! You have not made any purchases"
                    : "Oops! You have not created any artwork"
                }
                subText="Browse the marketplace for favourite artworks"
                button={
                  <Link href={"/marketplace"}>
                    <Button text="Go to Marketplace" textStyles="w-[144px]" />
                  </Link>
                }
              />
            </div>
          )}
          <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8">
            {(
              profile[(tab as keyof typeof profile) || "artworks"] as Art[]
            )?.map((a) => (
              <NftCard key={a.id} {...a} showLikes={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
