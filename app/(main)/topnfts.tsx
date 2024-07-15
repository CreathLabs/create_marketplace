import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import React from "react";

const TopNFTs = () => {
  return (
    <div className="pt-10 pb-14 space-y-9">
      <div className="contain flex justify-between items-center">
        <h1 className="font-Playfair font-bold !text-[40px] ">Top NFTs</h1>
        <Button text="Explore Marketplace" textStyles="w-[183px]" />
      </div>
      <div className="container max-w-screen-xl mx-auto pl-6 ">
        <div className="w-full scroller flex gap-x-10 overflow-x-auto">
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
        </div>
      </div>
    </div>
  );
};

export default TopNFTs;
