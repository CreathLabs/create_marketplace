"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryTabs: React.FC<{
  categories: Category[];
  searchParams: { category_id?: string };
}> = ({ categories, searchParams: { category_id } }) => {
  const [tabs, setTabs] = useState<{ name: string; value: string }[]>([]);
  const [active, setActive] = useState("all");

  const router = useRouter();

  useEffect(() => {
    setTabs([
      { name: "All", value: "all" },
      ...categories.map((item) => ({ name: item.name, value: item.id })),
    ]);
  }, [categories]);

  useEffect(() => {
    if (category_id) {
      setActive(category_id);
    } else {
      setActive("all");
    }
  }, [category_id]);

  const handleSwitchTab = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value === "all") {
      if (currentParams.has("category_id")) {
        currentParams.delete("category_id");
      }
    } else {
      currentParams.set("category_id", value);
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="flex lg:sticky lg:top-[70px] lg:h-[70px] bg-white z-50 gap-x-8 justify-between w-full overflow-auto scroller items-center">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={` lg:px-6 pb-3 lg:pb-5 ${
            active === item.value ? "border-b-2 border-black" : "border-none"
          } `}
        >
          <h1
            className={` text-base lg:text-xl cursor-pointer hover:text-black ${
              active === item.value ? "text-black" : "text-mainGray"
            }  lg:leading-[30px] !whitespace-nowrap font-semibold `}
            onClick={() => handleSwitchTab(item.value)}
          >
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
