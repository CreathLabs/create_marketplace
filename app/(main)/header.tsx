"use client";
import { deleteSession } from "@/actions";
import Button from "@/components/Button";
import NavLink from "@/components/NavLink";
import { MenuContext } from "@/contexts/menuContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { User } from "@prisma/client";
import {
  Bag2,
  Buildings,
  Clipboard,
  Gallery,
  House,
  People,
  Shop,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { useConnect } from '@particle-network/authkit';
import { userSignin, saveSession } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";

interface Props {
  openModal: () => void;
  current: User | null;
}

interface UserInfo {
  email: string;
  // add other properties if needed
}

const Header: React.FC<Props> = ({ openModal, current }) => {
  const { toggleMenu, open, setIsLoggedIn } = useContext(MenuContext);
  const { connect, disconnect } = useConnect();
  const router = useRouter();


  useEffect(() => {
    const handleSession = async () => {
      if (!current) {
        disconnect();
      }
    };
  
    handleSession();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!current)
  }, [current]);

  const handleLogin = async ()=>{
    try{
      const userInfo = await connect() as UserInfo;
      const email = userInfo?.email || "";
      const res = await userSignin({
        email: email,
        password: "Dummy"
      });
      await saveSession("token", res?.data?.token || "");
      router.push("/");
    }
    catch (err){
      const error = parseErrors(err);
      handleError(error.errors);
      disconnect()
    }
    // disconnect()
  }

  const handleLogout = async ()=>{
    await disconnect()
  }

  return (
    <main className="w-full h-[56px] lg:h-[70px] bg-white !z-50 sticky top-0">
      <div className="contain h-full flex justify-between items-center ">
        <Image
          src="/logo.svg"
          width={55}
          height={40}
          className="!z-50 cursor-pointer"
          alt=""
        />
        <div className=" hidden  xl:flex w-full h-full justify-center space-x-20 items-center">
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
        </div>
        <div className="flex h-full gap-x-6 ">
          <Button
            text={current ? current?.username : "Sign Up"}
            className="h-full lg:flex justify-center !z-50 items-center py-0 hidden w-[145px]"
            action={current ? () => router.push("/profile") : openModal}
          />
          <Button
            text={current ? "Log Out" : "Log In"}
            className="h-full lg:flex justify-center !z-50 items-center py-0 hidden w-[145px]"
            action={
              current
                ? async () => {
                    await deleteSession("token");
                    router.refresh();
                    handleLogout();
                  }
                : () => handleLogin()
            }
          />
          <div
            onClick={() => {
              toggleMenu(!open);
            }}
            className="h-full xl:hidden flex items-center"
          >
            <div className=" bg-grayTwo w-6 h-6 flex justify-center items-center ">
              <Icon icon="fe:app-menu" className="text-base" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;

const links = [
  {
    name: "Marketplace",
    url: "/marketplace",
    icon: <Shop size={20} variant="Outline" />,
  },
  {
    name: "Artists",
    url: "/artists",
    icon: <People size={20} variant="Outline" />,
  },
  {
    name: "Galleries",
    url: "/galleries",
    icon: <Buildings size={20} variant="Outline" />,
  },
];

export const company = (
  <div className="flex flex-col bg-white px-4 w-full py-6 space-y-8 ">
    {links.map((item, index) => (
      <div key={index} className="">
        <Link
          href={`${item.url}`}
          className={`text-mainGray font-medium text-base cursor-pointer pr-[13px] flex space-x-3 items-center `}
        >
          {item.icon}
          <h1>{item.name}</h1>
        </Link>
      </div>
    ))}
  </div>
);
