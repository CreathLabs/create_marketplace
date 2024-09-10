"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";
import Paginate from "react-js-pagination";

interface Props {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  action?: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({
  page,
  itemsPerPage,
  totalItems,
  action,
}) => {
  const router = useRouter();

  const handlePagination = (pageNumber: number) => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("page", pageNumber.toString());

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="w-fit px-3 !mt-[35px]">
      <Paginate
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        onChange={action ? action : handlePagination}
        pageRangeDisplayed={3}
        nextPageText={
          <Icon
            icon="ic:round-chevron-right"
            className=" !text-lg text-mainGray  lg:!text-xl !text-center"
          />
        }
        prevPageText={
          <Icon
            icon="ic:round-chevron-left"
            className=" !text-lg text-mainGray disabled:text-black lg:!text-xl !text-center"
          />
        }
        hideFirstLastPages
        innerClass=" flex space-x-2 items-center"
        activeClass="border !border-black "
        itemClass="!flex !items-center !justify-center w-[26px] h-[26px] lg:!w-[36px] lg:!h-[36px]"
        linkClass="text-mainGray text-xs lg:text-sm"
        itemClassNext="!flex !items-center !justify-center w-[26px] h-[26px] lg:!w-[36px] lg:!h-[36px]"
        itemClassPrev="!flex !items-center !justify-center w-[26px] h-[26px] lg:!w-[36px] lg:!h-[36px]"
        activeLinkClass="!text-[#000] text-xs lg:text-sm"
        disabledClass="!text-red-900"
      />
    </div>
  );
};

export default Pagination;
