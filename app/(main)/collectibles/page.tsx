import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import React from "react";
import Filters from "./filters";
import Collectible from "@/components/Collectible";
import { getCollectibles } from "@/actions";
import Pagination from "@/components/pagination";

const tabs = [
  "All",
  "Sculpture",
  "Painting",
  "Digital Art",
  "Photography",
  "Mixed Media",
];

const CollectiblesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getCollectibles(page);

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
        {/* <div className="flex justify-between items-center">
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
        </div> */}
        <div className="flex gap-x-[54px] ">
          <div className="w-[200px] space-y-6 ">
            <h1 className="font-semibold text-xl font-Playfair ">Filters</h1>
            <Filters />
          </div>
          <div className="flex w-full flex-col items-center gap-y-10">
            <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8 ">
              {data?.map((collectible) => (
                <Collectible key={collectible.id} {...collectible} />
              ))}
            </div>
            {total > ipp && (
              <Pagination itemsPerPage={16} page={page} totalItems={total} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesPage;
