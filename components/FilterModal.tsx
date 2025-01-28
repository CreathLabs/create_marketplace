"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

const FilterModal = ({
  children,
  showModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
}) => {
  const router = useRouter();

  const handleCloseFilter = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (currentParams.has("openModal")) {
      currentParams.delete("openModal");
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };
  return (
    <>
      {showModal && (
        <div className="w-full block lg:hidden fixed top-[56px] left-0 right-0 bottom-0 h-full bg-white !z-[50] contain overflow-y-scroll">
          <div className="py-6 h-full space-y-8 ">
            <div
              onClick={handleCloseFilter}
              className="space-x-2 cursor-pointer flex items-center"
            >
              <Icon
                icon="dashicons:arrow-left-alt2"
                className="!text-xl text-[#868686] "
              />
              <h1 className="text-xl font-Playfair font-bold ">Filters</h1>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
