"use client";
import React from "react";
import Image from "next/image";
import SideBarItem from "@/components/sidebar-item";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col lg:w-[280px] h-full max-h-screen overflow-auto gap-y-14  fixed top-0 left-0 bg-black py-8 ">
      <Link href="/">
        <div className="h-[70px]  flex items-center justify-center ">
          <Image src="/logowhite.svg" height={20} width={100} alt="Logo" />
        </div>
      </Link>
      <div className="flex flex-col gap-y-4">
        <SideBarItem
          href=""
          iconSrc="material-symbols:space-dashboard"
          label="Dashboard"
        />
        <SideBarItem href="users" iconSrc="mdi:art" label="Users" />
        <SideBarItem
          href="artworks"
          iconSrc="mdi:picture-360"
          label="Artworks"
        />
        <SideBarItem
          href="exhibitions"
          iconSrc="mdi:picture-360"
          label="Exhibitions"
        />
        <SideBarItem
          href="collectibles"
          iconSrc="mdi:person-child"
          label="Collectibles"
        />
        <SideBarItem
          href="blogs"
          iconSrc="ic:round-circle-notifications"
          label="Blogs"
        />
        <SideBarItem
          href="notifications"
          iconSrc="ic:round-circle-notifications"
          label="Notifications"
        />
        <SideBarItem
          href="transactions"
          iconSrc="mdi:person-child"
          label="Transactions"
        />
        <SideBarItem href="admins" iconSrc="mdi:person-child" label="Admins" />
      </div>
    </div>
  );
};

export default Sidebar;
