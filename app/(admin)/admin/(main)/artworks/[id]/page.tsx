import React from "react";
import Header from "../../header";
import Image from "next/image";
import { getAdminArtwork } from "@/actions";
import { redirect } from "next/navigation";
import DisplayInput from "@/components/DisplayInput";
import Buttons from "./buttons";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let data = null;
  try {
    const artwork = await getAdminArtwork(id);
    data = artwork;
  } catch (error) {}

  if (!data) {
    return redirect("/admin/artworks");
  }

  return (
    <div className="w-full  h-full">
      <Header title="Details" />
      <div className="px-10 py-8 space-y-14">
        <div className="grid grid-cols-2 gap-x-16 ">
          <div className="w-full h-[307px] relative">
            <Image
              src={data.art_image || ""}
              fill
              className="w-full h-full object-cover "
              alt=""
            />
          </div>
          <div className="w-full h-full flex flex-col justify-between">
            <div className="space-y-8">
              <h1 className="text-3xl font-semibold ">{data.name}</h1>
              <h2 className="text-sm font-semibold">
                Created by:{" "}
                <span className="text-base font-bold">{data.published_by}</span>
              </h2>
              <h1 className="text-3xl font-semibold ">{`${data?.floor_price?.toLocaleString()} USDC`}</h1>
            </div>
            <Buttons artwork={data} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          <DisplayInput
            label="Description**"
            name="description"
            type="text"
            value={data.description}
            placeholder="Description"
            className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
          />
          <DisplayInput
            label="Dimensions**"
            name="dimensions"
            type="text"
            value={data.dimensions}
            placeholder="Dimensions"
            className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
          />
          <DisplayInput
            label="Medium**"
            name="medium"
            type="text"
            value={data?.category?.name}
            placeholder="Medium"
            className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
          />
          <DisplayInput
            label="Location of Artist**"
            name="location"
            type="text"
            value={data?.location || ""}
            placeholder="location"
            className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
          />
        </div>
      </div>
    </div>
  );
};

export default page;
