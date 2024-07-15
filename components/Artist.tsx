"use client";
import { cn } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Artist = ({ className = "" }: { className?: string }) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "space-y-10 flex text-white  cursor-pointer flex-col items-center",
        className
      )}
      onClick={() => router.push("/artists/dwewe23re3r2refd2wef")}
    >
      <div className="w-[259px] h-[259px] rounded-full relative overflow-hidden ">
        <Image src="/featured.png" fill alt="Image" className="object-cover" />
      </div>
      <h1 className="font-bold font-Playfair text-[27px] ">Alfredoakinmade</h1>
    </div>
  );
};

export default Artist;
