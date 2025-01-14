"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const SearchInput = ({
  placeholder = "Search",
  defaultValue = "",
}: {
  placeholder?: string;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value === "") {
      if (currentParams.has("search")) {
        currentParams.delete("search");
      }
    } else {
      currentParams.set("search", value);
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="w-full lg:max-w-[50%] flex space-x-8 ">
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
      />
      <Button
        text="Search"
        action={handleSearch}
        className="w-[145px] h-full hidden lg:flex"
      />
    </div>
  );
};

export default SearchInput;
