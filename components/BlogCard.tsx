import Image from "next/image";
import React from "react";

const BlogCard = () => {
  return (
    <div className="w-full h-full pb-10 border-b border-mainGray/30 space-y-8">
      <div className="relative w-full h-[246px]">
        <Image src="/blog.png" fill className="object-cover" alt="" />
      </div>
      <div className="space-y-4">
        <h1 className="font-Playfair text-[25px] font-bold ">Blog Title</h1>
        <h2 className="text-mainGray text-lg">Date of Publication</h2>
      </div>
    </div>
  );
};

export default BlogCard;
