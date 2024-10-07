"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Table = () => {
  return (
    <div>
      <div className="grid grid-cols-4 w-full bg-grayTwo">
        {[
          {
            title: "Email Address",
            icon: "material-symbols:person",
          },
          {
            title: "Username",
            icon: "ph:bank-fill",
          },
          {
            title: "Artworks",
            icon: "heroicons:identification-20-solid",
          },
          {
            title: "Creation Date",
            icon: "clarity:date-solid",
          },
        ].map((item) => (
          <div key={item.icon} className="w-full flex items-center space-x-2 ">
            <Icon icon={item.icon} />
            <h1>{item.icon}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
