import React from "react";
import Header from "../../header";
import Image from "next/image";
import { getAdminArtwork, getAdminUser } from "@/actions";
import { redirect } from "next/navigation";
import DisplayInput from "@/components/DisplayInput";
import Buttons from "./buttons";
import NftCard from "@/components/NftCard";

const tabs = ["Uploaded Artworks", "Collected Artworks", "Transaction History"];

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let data = null;
  try {
    const user = await getAdminUser(id);
    data = user;
  } catch (error) {}

  if (!data) {
    return redirect("/admin/users");
  }

  const active = "Uploaded Artworks";

  return (
    <div className="w-full  h-full">
      <Header title="User Details" />
      <div className="px-10 py-8 space-y-16">
        <div className="grid grid-cols-2  w-full gap-x-10">
          <div className="space-y-8">
            <DisplayInput
              label="UserName"
              name="full_name"
              type="text"
              value={data.username}
              placeholder="Full Name"
              className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
            />
            <DisplayInput
              label="Email Address"
              name="email"
              type="email"
              value={data.email}
              placeholder="Email Address"
              className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
            />
            <DisplayInput
              label="Bio"
              name="bio"
              type="text"
              value={data.bio || ""}
              placeholder="Bio"
              className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
            />
            <DisplayInput
              label="Country"
              name="country"
              type="text"
              value={data.country || ""}
              placeholder="Country"
              className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
            />
            <DisplayInput
              label="Crypto Wallet Address"
              name="wallet_address"
              type="password"
              value={data.wallet_address || ""}
              placeholder="New Password"
              className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
            />
            <Buttons />
          </div>
          <div className="w-full flex flex-col justify-between gap-y-12 items-center">
            <div className="w-full min-h-[350px] h-full bg-grayTwo relative">
              <Image
                src={
                  data.profile_image ||
                  `https://api.dicebear.com/9.x/initials/png?seed=${data?.username}`
                }
                fill
                className="w-full h-full object-cover"
                alt="Image"
              />
            </div>
          </div>
        </div>
        <div className="pb-[98px] space-y-10">
          <div className="flex space-x-24 items-center">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`px-1 pb-3 ${
                  active === item ? "border-b-2 border-black" : "border-none"
                } `}
              >
                <h1
                  className={` text-base ${
                    active === item ? "text-black" : "text-mainGray"
                  }  leading-[30px] font-semibold `}
                >
                  {item}
                </h1>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-10">
            {data?.artworks?.map((a) => (
              <NftCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
