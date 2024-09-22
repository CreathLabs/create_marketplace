import { getExhibitions } from "@/actions";
import Button from "@/components/Button";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/pagination";
import React from "react";

const Exhibitions = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getExhibitions(page);

  return (
    <div className="py-14 contain space-y-[72px]">
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-0 justify-between lg:items-center ">
        <h1 className=" heading leading-[60px] ">
          Creath Exhibitons
        </h1>
        <div className="w-full lg:max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Art or Artists"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
          />
          <Button text="Search" className="w-[145px] h-full hidden lg:flex" />
        </div>
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
