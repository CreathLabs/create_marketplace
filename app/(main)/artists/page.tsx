import { getArtists } from "@/actions";
import Artist from "@/components/Artist";
import Button from "@/components/Button";
import Pagination from "@/components/pagination";
import React from "react";

const ArtistsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const { data, total, ipp } = await getArtists(page);

  return (
    <div className="py-14 contain space-y-14">
      <div className="flex justify-between items-center ">
        <h1 className="text-[40px] font-Playfair font-bold leading-[60px] ">
          Creath Artists
        </h1>
        <div className="w-full max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Art or Artists"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
          />
          <Button text="Search" className="w-[145px] h-full" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-y-10">
        <div className="grid grid-cols-4 gap-20 ">
          {data.map((a) => (
            <Artist key={a.id} className="text-black" artist={a} />
          ))}
        </div>
        {total > ipp && (
          <Pagination itemsPerPage={16} page={page} totalItems={total} />
        )}
      </div>
    </div>
  );
};

export default ArtistsPage;
