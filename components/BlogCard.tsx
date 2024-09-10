import { Blog } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import React from "react";

const BlogCard: React.FC<Blog> = ({ cover_image, title, created_at }) => {
  return (
    <div className="w-full h-full pb-5 lg:pb-10 border-b border-mainGray/30 space-y-6 md:space-y-8">
      <div className="relative w-full h-[246px]">
        <Image src={cover_image} fill className="object-cover" alt="" />
      </div>
      <div className="space-y-3 md:space-y-4">
        <h1 className="font-Playfair text-xl lg:text-[25px] font-bold ">
          {title}
        </h1>
        <h2 className="text-mainGray  text-base lg:text-lg">
          {moment(created_at).format("LL")}
        </h2>
      </div>
    </div>
  );
};

export default BlogCard;
