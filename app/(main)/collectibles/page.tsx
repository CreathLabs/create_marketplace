import Button from "@/components/Button";
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
    <div className="py-14 w-full contain space-y-8 lg:space-y-[72px]">
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
        <h1 className=" heading leading-[60px]  ">Collectibles</h1>
        <div className="w-full lg:max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Collectible"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo"
          />
          <Button text="Search" className="w-[145px] h-full hidden lg:flex" />
        </div>
      </div>
      <div className="space-y-12">
        <div className="flex w-full lg:gap-x-[54px] ">
          <div className="w-[200px] sticky top-[70px]   space-y-6 hidden lg:block ">
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
