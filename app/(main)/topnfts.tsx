import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import { Art } from "@prisma/client";
import Link from "next/link";
import React from "react";

const TopNFTs: React.FC<{ topNfts: Art[] }> = ({ topNfts }) => {
  return (
    <div className="lg:pt-10 lg:pb-14 pt-8 pb-6 space-y-8 md:space-y-9">
      <div className="contain flex justify-between items-center">
        <h1 className="font-Playfair font-bold text-[28px] lg:text-[40px] ">
          Artworks
        </h1>
        <Link href={"/marketplace"}>
          <Button
            text="Explore Marketplace"
            textStyles="w-[183px]"
            className="hidden lg:flex"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="container max-w-screen-xl mx-auto pl-6 ">
          <div className="w-full scroller flex gap-x-8 lg:gap-x-10 overflow-x-auto">
            {topNfts.map((nft) => (
              <NftCard key={nft.id} {...nft} />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center lg:hidden">
          <Link href={"/marketplace"}>
            <Button text="Explore Marketplace" textStyles="w-[144px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNFTs;
