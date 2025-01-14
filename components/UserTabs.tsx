"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserTabs: React.FC<{
  tab: string;
  tabs: {
    name: string;
    value: string;
  }[];
}> = ({ tab, tabs }) => {
  const [active, setActive] = useState(tabs[0].name);

  const router = useRouter();

  useEffect(() => {
    if (tab) {
      setActive(tab);
    } else {
      setActive(tabs[0].name);
    }
  }, [tab, tabs]);

  const handleSwitchTab = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("tab", value);

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div className="flex space-x-24 items-center">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`px-1 pb-3 ${
            active === item.value ? "border-b-2 border-black" : "border-none"
          } `}
        >
          <h1
            className={` text-xl cursor-pointer ${
              active === item.value ? "text-black" : "text-mainGray"
            }  leading-[30px] font-semibold `}
            onClick={() => handleSwitchTab(item.value)}
          >
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default UserTabs;
