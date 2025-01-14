"use client";
import Button from "@/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const sortBys = [
  {
    name: "Popularity",
    value: "popularity",
  },
  {
    name: "Recently Added",
    value: "recent",
  },
  {
    name: "Lowest Price",
    value: "lowest",
  },
  {
    name: "Highest Price",
    value: "highest",
  },
];

const medias = [
  { name: "All", value: "" },
  { name: "Image", value: "jpg,jpeg,png,webp" },
  { name: "GIF", value: "gif" },
  { name: "Video", value: "mp4" },
];

const Filters = ({
  sortby,
  media,
  min,
  max,
}: {
  sortby?: string;
  media?: string;
  min?: string;
  max?: string;
}) => {
  const [activeSort, setActiveSort] = useState("popularity");
  const [activeMedia, setActiveMedia] = useState("");
  const [minMax, setMinMax] = useState({ min: "", max: "" });

  const router = useRouter();

  useEffect(() => {
    setActiveSort(sortby || "popularity");
  }, [sortby]);

  useEffect(() => {
    setActiveMedia(media || "");
  }, [media]);

  useEffect(() => {
    setMinMax({
      min: min || "",
      max: max || "",
    });
  }, [min, max]);

  const handleSort = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("sortby", value);

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  const handleMedia = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value === "") {
      if (currentParams.has("media")) {
        currentParams.delete("media");
      }
    } else {
      currentParams.set("media", value);
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  const handleMinMax = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (!minMax.min && !minMax.max) {
      if (currentParams.has("min")) {
        currentParams.delete("min");
      }
      if (currentParams.has("max")) {
        currentParams.delete("max");
      }
    } else {
      currentParams.set("min", minMax.min);
      currentParams.set("max", minMax.max);
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Price - USDC</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        <form className="w-full space-y-2">
          <div className=" w-full grid grid-cols-2 gap-x-3">
            <input
              placeholder="Min"
              type="number"
              value={minMax.min}
              onChange={(e) => {
                setMinMax((prev) => ({
                  ...prev,
                  min: e.target.value,
                }));
              }}
              className="outline-none py-[6px] px-3 text-sm font-light placeholder:text-sm placeholder:text-mainGray placeholder:font-light border border-mainGray/20  "
            />

            <input
              placeholder="Max"
              type="number"
              value={minMax.max}
              onChange={(e) => {
                setMinMax((prev) => ({
                  ...prev,
                  max: e.target.value,
                }));
              }}
              className="outline-none py-[6px] px-3 text-sm font-light placeholder:text-sm placeholder:text-mainGray placeholder:font-light border border-mainGray/20  "
            />
          </div>
          {minMax.min! > minMax.max && (
            <div className="w-full flex justify-center  ">
              <Button
                text="Done"
                textStyles="text-xs"
                className="py-2"
                action={handleMinMax}
              />
            </div>
          )}
        </form>
      </div>
      <div className="space-y-4 text-base">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Sort by</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        {sortBys.map((item) => (
          <CheckBox
            key={item.value}
            name={item.name}
            value={item.value}
            active={item.value === activeSort}
            action={handleSort}
          />
        ))}
      </div>
      <div className="space-y-4 text-base">
        <div className="flex items-center justify-between ">
          <h1 className="text-base font-semibold">Media</h1>
          <Icon
            icon="dashicons:arrow-down-alt2"
            className="text-base text-mainGray"
          />
        </div>
        {medias.map((item) => (
          <CheckBox
            key={item.name}
            name={item.name}
            value={item.value}
            active={item.value === activeMedia}
            action={handleMedia}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;

const CheckBox = ({
  name,
  value,
  active,
  action,
}: {
  name: string;
  value: string;
  active: boolean;
  action: (value: string) => void;
}) => {
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer "
      onClick={() => action(value)}
    >
      <div
        className={`border  ${
          active ? "border-balck bg-black" : "border-mainGray bg-grayTwo"
        } rounded  w-4 h-4 `}
      ></div>
      <h1>{name}</h1>
    </div>
  );
};
