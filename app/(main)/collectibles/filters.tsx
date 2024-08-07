"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const sortBys = [
  "Popularity",
  "Recently Added",
  "Lowest Price",
  "Highest Price",
  "Recently Sold",
];

const media = ["Image", "GIF", "3D", "Video"];

const Filters = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Price - USDC</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        <div className=" w-full grid grid-cols-2 gap-x-3">
          <input
            placeholder="Min"
            className="outline-none py-[6px] px-3 text-sm font-light placeholder:text-sm placeholder:text-mainGray placeholder:font-light border border-mainGray/20  "
          />

          <input
            placeholder="Max"
            className="outline-none py-[6px] px-3 text-sm font-light placeholder:text-sm placeholder:text-mainGray placeholder:font-light border border-mainGray/20  "
          />
        </div>
      </div>
      <div className="space-y-4 text-base">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Sort by</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        {sortBys.map((item) => (
          <CheckBox key={item} name={item} />
        ))}
      </div>
      <div className="space-y-4 text-base">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Media</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        {media.map((item) => (
          <CheckBox key={item} name={item} />
        ))}
      </div>
    </div>
  );
};

export default Filters;

const CheckBox = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="border border-mainGray rounded bg-grayTwo w-4 h-4 "></div>
      <h1>{name}</h1>
    </div>
  );
};
