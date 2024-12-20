"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "@prisma/client";
import parse from "html-react-parser";

const BlogPageCard: React.FC<Blog> = ({ cover_image, title, content, id }) => {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-row items-center justify-start w-full h-[170px] md:h-[170px] overflow-hidden cursor-pointer border-2 border-light-gray-500"
      onClick={() => router.push(`/blogs/${id}`)}
    >
      <Image
        src={cover_image}
        fill
        alt="Image"
        className="h-full !w-[20%] !relative object-cover "
      />
      <div className="w-[70%] ml-4">
        <h2 className=" font-Playfair text-xl  font-bold lg:!leading-loose md:!leading-loose leading-0 line-clamp-3 ">
          {title}
        </h2>
        <p className="text-gray-500 font-semibold leading-loose w-[80%] line-clamp-2 lg:text-lg md:text-lg text-base ">
          {parse(content)}
        </p>
      </div>
    </div>
  );
};

export default BlogPageCard;
