"use client";
import { MenuContext } from "@/contexts/menuContext";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import NavLink from "@/components/NavLink";
import {
  Bag2,
  Buildings,
  Clipboard,
  Gallery,
  House,
  People,
  Shop,
} from "iconsax-react";
import Link from "next/link";

const Menu = () => {
  const { toggleMenu, open } = useContext(MenuContext);

  return (
    <div
      className="fixed top-0 left-0 bottom-[100%] transition-all overflow-hidden ease-in-out duration-700 !z-50 right-0 flex w-full h-0 justify-end contain bg-white "
      style={{
        height: open ? "100vh" : "0px",
        // transition: "all 0.3s ease",
        // opacity: open ? "1" : "0",
      }}
    >
      <div
        className="w-full py-9 !mt-[56px] space-y-12 transition-all ease-in-out duration-500 "
        style={{
          opacity: open ? "1" : "0",
        }}
      >
        <Icon
          icon="dashicons:arrow-left-alt2"
          className="text-xl text-mainGray"
          onClick={() => toggleMenu(false)}
        />
        <ul className="w-full h-full flex flex-col space-y-12">
          <NavLink
            text="Home"
            icon={<House size="20" variant="Outline" />}
            path=""
          />
          <NavLink
            text="Art"
            path="art"
            icon={<Gallery size="20" variant="Outline" />}
            isdropdown
            content={company}
          />
          <NavLink
            text="Collectibles"
            path="collectibles"
            icon={<Bag2 size="20" variant="Outline" />}
          />
          <NavLink
            text="Exhibitions"
            path="exhibitions"
            icon={<Clipboard size="20" variant="Outline" />}
          />
        </ul>
      </div>
    </div>
  );
};

export default Menu;

const links = [
  {
    name: "Marketplace",
    url: "marketplace",
    icon: <Shop size={20} variant="Outline" />,
  },
  {
    name: "Artists",
    url: "artists",
    icon: <People size={20} variant="Outline" />,
  },
  {
    name: "Galleries",
    url: "galleries",
    icon: <Buildings size={20} variant="Outline" />,
  },
];

export const company = (
  <div className="flex flex-col bg-white px-4 w-full pt-4 space-y-8 ">
    {links.map((item, index) => (
      <NavLink key={index} icon={item.icon} path={item.url} text={item.name} />
    ))}
  </div>
);
