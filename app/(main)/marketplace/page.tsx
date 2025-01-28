import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import React from "react";
import Filters from "@/components/filters";
import { getCategories, getNfts } from "@/actions";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/SearchInput";
import CategoryTabs from "@/components/CategoryTabs";
import { FilterButton } from "@/components/buttons";
import FilterModal from "@/components/FilterModal";

const MarketPlacePage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    category_id?: string;
    search?: string;
    sortby?: "popularity" | "recent" | "lowest" | "highest" | "sold";
    media?: string;
    min?: string;
    max?: string;
    openModal?: string;
  };
}) => {
  const { category_id, search, sortby, media, min, max, openModal } =
    searchParams;
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getNfts(page, sortby, {
    category_id,
    name: search,
    media,
    min,
    max,
  });
  const categories = await getCategories();

  const showModal = Number(openModal);

  return (
    <>
      <div className="py-14 w-full contain space-y-8 lg:space-y-[72px] min-h-[calc(100vh-70px)]">
        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
          <h1 className=" heading leading-[60px] ">Marketplace</h1>
          <SearchInput
            placeholder="Search Art or Artists"
            defaultValue={search}
          />
        </div>
        <div className="w-full space-y-6 lg:space-y-12">
          <CategoryTabs categories={categories} searchParams={searchParams} />
          <FilterButton />
          <div className="flex w-full lg:gap-x-[54px] ">
            <div className="w-[200px] sticky top-[70px]   space-y-6 hidden lg:block ">
              <h1 className="font-semibold text-xl font-Playfair ">Filters</h1>
              <Filters sortby={sortby} media={media} min={min} max={max} />
            </div>
            <div className="flex w-full flex-col items-center gap-y-10">
              <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8 ">
                {data?.map((nft) => (
                  <NftCard key={nft.id} {...nft} />
                ))}
              </div>
              {total > ipp && (
                <Pagination itemsPerPage={9} page={page} totalItems={total} />
              )}
            </div>
          </div>
        </div>
      </div>
      <FilterModal showModal={Boolean(showModal)}>
        <Filters sortby={sortby} media={media} min={min} max={max} />
      </FilterModal>
    </>
  );
};

export default MarketPlacePage;
