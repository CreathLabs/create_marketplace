import { getArtists } from "@/actions";
import Artist from "@/components/Artist";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/SearchInput";
import React from "react";

const ArtistsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getArtists(page, searchParams.search);
  console.log(total)

  return (
    <div className="py-14 contain space-y-[72px] min-h-[calc(100vh-70px)]">
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
        <h1 className="heading leading-[60px] ">Artists</h1>
        <SearchInput
          placeholder="Search Artists"
          defaultValue={searchParams.search}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-y-10">
        <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8 ">
          {data.map((a) => (
            <Artist key={a.id} className="text-black" artist={a} />
          ))}
        </div>
        {total > ipp && (
          <Pagination itemsPerPage={12} page={page} totalItems={total} />
        )}
      </div>
    </div>
  );
};

export default ArtistsPage;
