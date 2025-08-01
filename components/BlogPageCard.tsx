"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "@prisma/client";
import parse from "html-react-parser";

const BlogPageCard: React.FC<Blog> = ({ cover_image, title, content, id, created_at }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col w-full h-[470px] md:h-[470px] overflow-hidden cursor-pointer border-2 border-light-gray-500"
      onClick={() => router.push(`/blogs/${id}`)}
    >
      {/* Image container - 65% of card height */}
      <div className="relative w-full h-[65%]">
        <Image
          src={cover_image}
          fill
          alt="Image"
          className="object-cover"
        />
      </div>

      {/* Content container - 35% of card height */}
      <div className="flex-1 p-4 flex flex-col justify-center h-[35%]">
        <h2 className="font-Playfair text-xl font-bold lg:!leading-loose md:!leading-loose leading-0 line-clamp-1 mb-2">
          {title}
        </h2>
        <p className="text-gray-500 font-semibold leading-loose line-clamp-2 lg:text-lg md:text-lg text-base">
          {parse(content)}
        </p>
        <p>
          <span className="text-gray-500 font-semibold text-base">
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BlogPageCard;
