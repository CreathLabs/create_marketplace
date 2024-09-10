import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import React from "react";
import Filters from "./filters";
import { getNfts } from "@/actions";
import Pagination from "@/components/pagination";

const tabs = [
  "All",
  "Sculpture",
  "Painting",
  "Digital Art",
  "Photography",
  "Mixed Media",
];

const MarketPlacePage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const active = "All";
  const page = Number(searchParams?.page) || 1;

  const { data, total } = await getNfts(page);

  return (
    <div className="py-14 w-full contain space-y-8 lg:space-y-[72px]">
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
        <h1 className=" heading leading-[60px] ">Marketplace</h1>
        <div className="w-full lg:max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Art or Artists"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
          />
          <Button text="Search" className="w-[145px] h-full hidden lg:flex" />
        </div>
      </div>
      <div className="w-full space-y-12">
        <div className="flex gap-x-8 justify-between w-full overflow-auto scroller items-center">
          {tabs.map((item, index) => (
            <div
              key={index}
              className={` lg:px-6 pb-3 lg:pb-5 ${
                active === item ? "border-b-2 border-black" : "border-none"
              } `}
            >
              <h1
                className={` text-base lg:text-xl ${
                  active === item ? "text-black" : "text-mainGray"
                }  lg:leading-[30px] !whitespace-nowrap font-semibold `}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex w-full lg:gap-x-[54px] ">
          <div className="w-[200px] space-y-6 hidden lg:block ">
            <h1 className="font-semibold text-xl font-Playfair ">Filters</h1>
            <Filters />
          </div>
          <div className="flex w-full flex-col items-center gap-y-10">
            <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8 ">
              {data?.map((nft) => (
                <NftCard key={nft.id} {...nft} />
              ))}
            </div>
            <Pagination itemsPerPage={9} page={page} totalItems={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlacePage;
