import { getExhibitions } from "@/actions";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/SearchInput";
import React from "react";

const Exhibitions = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getExhibitions(page, searchParams.search);

  return (
    <div className="py-14 contain space-y-[72px] min-h-[calc(100vh-70px)]">
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
        <h1 className=" heading leading-[60px] ">Creath Exhibitons</h1>
        <SearchInput
          placeholder="Search Artists"
          defaultValue={searchParams.search}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-y-10">
        <div className="w-full grid lg:grid-cols-2 gap-[60px] ">
          {data.map((e) => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
        {total > ipp && (
          <Pagination itemsPerPage={16} page={page} totalItems={total} />
        )}
      </div>
    </div>
  );
};

export default Exhibitions;
