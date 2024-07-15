"use client";
import { ArrowDown2 } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactElement, useContext, useRef, useState } from "react";

interface Props {
  path: string;
  text: string;
  icon: any;
  isdropdown?: boolean;
  content?: ReactElement;
}

const NavLink: React.FC<Props> = ({
  path,
  text,
  isdropdown,
  icon,
  content,
}) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname().replace("/", "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);

  return (
    <div
      onMouseOver={() => {
        if (!isdropdown) {
          return;
        }
        setShow(true);
      }}
      onMouseLeave={() => {
        if (!isdropdown) {
          return;
        }
        setShow(false);
      }}
      onClick={() => {
        if (!isdropdown) {
          return;
        }
        setShow(!show);
      }}
      className={`w-fit h-full flex flex-col xl:flex-row xl:items-center  relative ${
        path === pathname ? "border-b-2 border-black" : "border-none"
      } `}
    >
      <Link
        href={!isdropdown ? `/${path}` : ""}
        className={`${
          path === pathname ? "text-black" : "text-mainGray"
        } font-medium text-base cursor-pointer pr-[13px] flex space-x-3 items-center `}
      >
        {icon}
        <div className="flex items-center space-x-2">
          <h1>{text}</h1>
          {isdropdown && <ArrowDown2 size={16} variant="Outline" />}
        </div>
      </Link>

      {isdropdown && (
        <>
          <div
            className=" transition-all duration-300 ease-linear hidden xl:block shadow-lg   absolute top-[100%] overflow-hidden -left-5 "
            style={{
              height: show ? dropdownRef.current?.clientHeight + "px" : "0px",
            }}
          >
            <div
              ref={dropdownRef}
              className="overflow-hidden whitespace-nowrap !w-full min-w-[250px] "
            >
              {content}
            </div>
          </div>
          <div
            className=" transition-all duration-300 ease-linear block xl:hidden overflow-hidden   "
            style={{
              height: show
                ? dropdownRefMobile.current?.clientHeight + "px"
                : "0px",
            }}
          >
            <div
              ref={dropdownRefMobile}
              className="overflow-hidden rounded-b-[20px] py-6 px-1 whitespace-nowrap !w-full min-w-[300px]"
            >
              {content}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavLink;
