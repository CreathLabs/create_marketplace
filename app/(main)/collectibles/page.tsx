import React from "react";
import Collectible from "@/components/Collectible";
import { getCollectibles } from "@/actions";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/SearchInput";
import Filters from "@/components/filters";
import FilterModal from "@/components/FilterModal";
import { FilterButton } from "@/components/buttons";
import EmptyComponent from "@/components/EmptyComponent";

const CollectiblesPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    sortby?: "popularity" | "recent" | "lowest" | "highest" | "sold";
    media?: string;
    min?: string;
    max?: string;
    openModal?: string;
  };
}) => {
  const { search, sortby, media, min, max, openModal } = searchParams;
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getCollectibles(page, sortby, {
    name: search,
    media,
    min,
    max,
  });

  const showModal = Number(openModal);

  return (
    <>
      {/* <div className="py-14 w-full contain space-y-8 lg:space-y-[72px] min-h-[calc(100vh-70px)]">
        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
          <h1 className=" heading leading-[60px]  ">Collectibles</h1>
          <SearchInput
            placeholder="Search Collectibles"
            defaultValue={search}
          />
        </div>
        <div className="space-y-6">
          <FilterButton />
          <div className="flex w-full lg:gap-x-[54px] ">
            <div className="w-[200px] sticky top-[70px]   space-y-6 hidden lg:block ">
              <h1 className="font-semibold text-xl font-Playfair ">Filters</h1>
              <Filters sortby={sortby} media={media} min={min} max={max} />
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
      <FilterModal showModal={Boolean(showModal)}>
        <Filters sortby={sortby} media={media} min={min} max={max} />
      </FilterModal> */}
      <div className="py-16 min-h-[calc(100vh-70px)]">
        <EmptyComponent
          text="Thank you! For Using Creath But Collectibles Are Currently Unavailable"
          className="max-w-[631px]"
        />
      </div>
    </>
  );
};

export default CollectiblesPage;
