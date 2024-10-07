"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const SideBarItem: React.FC<Props> = ({ label, iconSrc, href }) => {
  const pathname = usePathname();

  const active = href === "" ? pathname === "/admin" : pathname.includes(href);

  return (
    <Link
      href={`/admin/${href}`}
      className={`p-4 pl-10 flex items-center w-full font-semibold  ${
        active ? "bg-white !text-black" : "bg-none !text-white "
      } `}
    >
      <div className="flex items-center gap-x-4">
        <Icon icon={iconSrc} className="!text-2xl text-inherit " />
        <h1 className="text-lg text-inherit ">{label}</h1>
      </div>
    </Link>
  );
};

export default SideBarItem;
