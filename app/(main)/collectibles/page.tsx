import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import React from "react";
import Filters from "./filters";
import Collectible from "@/components/Collectible";

const tabs = [
  "All",
  "Sculpture",
  "Painting",
  "Digital Art",
  "Photography",
  "Mixed Media",
];

const CollectiblesPage = () => {
  const active = "All";
  return (
    <div className="py-14 contain space-y-[72px]">
      <div className="flex justify-between items-center ">
        <h1 className="text-[40px] font-Playfair font-bold leading-[60px] ">
          Collectibles
        </h1>
        <div className="w-full max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Collectible"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
          />
          <Button text="Search" className="w-[145px] h-full" />
        </div>
      </div>
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          {tabs.map((item, index) => (
            <div
              key={index}
              className={`px-6 pb-5 ${
                active === item ? "border-b-2 border-black" : "border-none"
              } `}
            >
              <h1
                className={` text-xl ${
                  active === item ? "text-black" : "text-mainGray"
                }  leading-[30px] font-semibold `}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex gap-x-[54px] ">
          <div className="w-[200px] space-y-6 ">
            <h1 className="font-semibold text-xl font-Playfair ">Filters</h1>
            <Filters />
          </div>
          <div className="w-full grid grid-cols-3 gap-8 ">
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
            <Collectible />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesPage;
