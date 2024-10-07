"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Toggler = ({ type }: { type: string }) => {
  const router = useRouter();
  const handleToggle = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("type", type);

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="flex items-center gap-x-20 ">
      {["users", "galleries"].map((item) => (
        <div
          className={`px-4 cursor-pointer py-2 ${
            type === item ? "border-b-2  border-black" : ""
          } `}
          onClick={() => handleToggle(item)}
          key={item}
        >
          <h1 className="capitalize text-base  ">{item}</h1>
        </div>
      ))}
    </div>
  );
};

export default Toggler;
