import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { getBlog } from "@/actions";
import { redirect } from "next/navigation";
import parse from "html-react-parser";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let data = null;
  try {
    const res = await getBlog(id);
    data = res;
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    redirect("/");
  }

  return (
    <div className="py-14 w-full contain space-y-8 lg:space-y-[72px]">
      <div className="flex flex-col md:w-[50%] lg:w-[60%] w-full lg:flex-column gap-y-6 lg:gap-0 justify-between lg:items-start ">
        <h1 className=" heading leading-[60px] ">{data.title}</h1>
        <div className="flex flex-row lg:w-[30%] md:w-[30%] w-[50%] mt-8 items-start justify-between">
          <Icon
            icon="ant-design:instagram-filled"
            className="text-black text-2xl lg:text-[26px]"
          />
          <Icon
            icon="ant-design:twitter-outlined"
            className="text-black text-2xl lg:text-[26px]"
          />
          <Icon
            icon="dashicons:linkedin"
            className="text-black text-2xl lg:text-[26px]"
          />
        </div>
      </div>
      <div className="lg:px-14 flex flex-col gap-y-8 lg:items-start ">
        <Image
          src={data.cover_image}
          fill
          alt="Image"
          className=" !h-[200px] !w-[100%] !relative object-cover "
        />
        <div className="px-7">{parse(data.content)}</div>
      </div>
    </div>
  );
};

export default page;
