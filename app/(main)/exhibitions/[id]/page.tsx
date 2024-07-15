import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import Image from "next/image";
import React from "react";

const ExhibitionDetails = () => {
  return (
    <div className="w-full h-full space-y-10 ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src="/artist_cover.png"
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain flex justify-end ">
          <div className="bg-grayTwo relative w-[36%] space-y-12  h-fit p-8 ">
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Date</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                23 July 2024
              </h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Time</h3>
              <h2 className="font-bold text-2xl font-Playfair ">02:00 PM</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Venue</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                24 Blue Road, Lekki Lagos. Nigeria
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="contain space-y-[105px] ">
        <div className="w-full space-y-4 max-w-[50%]">
          <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
            Two Boys One Lambo
          </h1>
          <div className="flex flex-col  w-full">
            <h3 className="font-semibold text-xl leading-9 tracking-[5%] ">
              Lorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect leut
              wefLorem Ipsum Dolor consect leut wefLorem Ipsum Dolor consect
              leut wefLorem Ipsum sect leut wefLorem Ipsum
            </h3>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="pb-[98px] space-y-6">
          <h1 className="font-Playfair font-bold !text-3xl ">
            Featured Artworks
          </h1>
          <div className="grid grid-cols-3 gap-10">
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
            <NftCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetails;
