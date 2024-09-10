"use client";
import { cn } from "@/lib";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Artist = ({
  className = "",
  artist,
}: {
  className?: string;
  artist: User;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "space-y-10 flex text-white  cursor-pointer flex-col items-center",
        className
      )}
      onClick={() => router.push(`/artists/${artist.id}`)}
    >
      <div className="w-[259px] h-[259px] rounded-full relative overflow-hidden ">
        <Image
          src={artist?.profile_image || ""}
          fill
          alt="Image"
          className="object-cover"
        />
      </div>
      <h1 className="font-bold font-Playfair text-2xl lg::text-[27px] ">
        {artist.username}
      </h1>
    </div>
  );
};

export default Artist;
