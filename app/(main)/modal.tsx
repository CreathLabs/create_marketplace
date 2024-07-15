"use client";
import Button from "@/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  handleClose: () => void;
}

const Modal: React.FC<Props> = ({ handleClose }) => {
  const router = useRouter();

  return (
    <div className="w-full h-full fixed top-0 lef-0 right-0 bottom-0 bg-[#00000099] ">
      <div className="contain w-full h-full flex items-center justify-center  ">
        <div className="w-[80%] h-auto relative bg-white px-8 pt-[42px] pb-6 flex flex-col gap-y-12 ">
          <Icon
            icon="ic:outline-cancel"
            onClick={handleClose}
            className="text-[32px] absolute cursor-pointer right-5 top-5"
          />
          <h1 className="font-Playfair text-[25px] font-bold">Log in as</h1>
          <div className="space-y-14 w-full flex flex-col items-center">
            <div className="grid w-full grid-cols-2 gap-x-10">
              <div
                className="w-full h-[267px] relative cursor-pointer "
                onClick={() => {
                  handleClose();
                  router.push("/auth/login");
                }}
              >
                <Image
                  src="/art_collector.png"
                  fill
                  className={`object-cover transition-all  ease-in-out duration-500  `}
                  alt="Blog_image"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0  w-full h-full bg-[#000000]/80 text-white flex justify-center items-center ">
                  <h1 className="font-Playfair text-[27px] font-bold ">
                    Artists or Collector
                  </h1>
                </div>
              </div>
              <div
                className="w-full h-[267px] relative cursor-pointer "
                onClick={() => {
                  handleClose();
                  router.push("/auth/login");
                }}
              >
                <Image
                  src="/art_gallery.png"
                  fill
                  className={`object-cover transition-all  ease-in-out duration-500  `}
                  alt="Blog_image"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0  w-full h-full bg-[#000000]/80 text-white flex justify-center items-center ">
                  <h1 className="font-Playfair text-[27px] font-bold ">
                    Art Gallery
                  </h1>
                </div>
              </div>
            </div>
            <Button
              text="Close"
              action={handleClose}
              className="py-4 px-32 "
              textStyles="w-[183px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
