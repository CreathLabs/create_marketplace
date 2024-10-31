import { getProfile } from "@/actions";
import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import DashStat from "@/components/DashStat";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const tabs = ["Created", "Collected", "Likes"];

const UserProfile = async () => {
  let profile = null;
  try {
    const res = await getProfile();
    profile = res;
  } catch (error) {
    console.log(error);
  }

  if (!profile) {
    redirect("/auth/login");
  }

  const active = "Created";
  const profileImage =
    profile?.profile_image ||
    `https://api.dicebear.com/9.x/initials/png?seed=${profile?.username}`;

  return (
    <div className="w-full h-full  ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src={profile.cover_image || "/artist_cover.png"}
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain ">
          <div className="bg-grayTwo relative w-[264px]  h-[264px] ">
            <Image
              src={profileImage}
              fill
              alt="Image"
              className="object-cover p-5"
            />
          </div>
        </div>
      </div>
      <div className="contain space-y-[105px] ">
        <div className="w-full grid grid-cols-2 gap-x-20 ">
          <div className="w-full space-y-4 mt-[193px]  ">
            <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
              {profile?.username}
            </h1>
            <div className="space-y-6">
              <h3 className="font-semibold text-xl leading-9 tracking-[5%]  ">
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
                    textStyles="w-[183px]"
                  />
                )}

                <Button
                  text="Edit Profile"
                  action={async () => {
                    "use server";
                    redirect("/profile/edit");
                  }}
                  textStyles="w-[183px]"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-grayTwo p-8 space-y-[60px] ">
            <DashStat title="Wallet Balance" value="Balance" />
            <DashStat title="Collector’s Royalty" value="Royalty" />
          </div>
        </div>

        <div className="pb-[98px] space-y-6">
          <div className="flex space-x-24 items-center">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`px-1 pb-3 ${
                  active === item ? "border-b-2 border-black" : "border-none"
                } `}
              >
                <h1
                  className={` text-xl ${
                    active === item ? "text-black" : "text-mainGray"
                  }  leading-[30px] font-semibold `}
                >
                  {item}
                </h1>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-10">
            {profile?.artworks?.map((a) => (
              <NftCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

