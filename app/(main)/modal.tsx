"use client";
import Button from "@/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useConnect, useEthereum } from '@particle-network/authkit';
import { createUser, verifyOtp, saveSession } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { ethers } from "ethers";

interface Props {
  handleClose: () => void;
}

interface UserInfo {
  email: string;
  // add other properties if needed
}



const Modal: React.FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const { connect, disconnect } = useConnect();
  const { provider } =  useEthereum()

  const handleConnect = async (type: string)=>{
    console.log(type)
    try{
      const userInfo = await connect() as UserInfo;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const accounts = await ethersProvider.listAccounts();
      const email = userInfo?.email || "";
      await createUser({
        email: userInfo?.email,
        password: "Dummy",
        wallet_address: accounts[0],
        type: type
      }).then(async (resp) => {
        console.log(resp)
        try {
          const res = await verifyOtp({
            email,
            otp: resp?.otp || "",
          });
          await saveSession("token", res?.data?.token || "");
          router.push("/");
        } catch (err) {
          const error = parseErrors(err);
          handleError(error.errors);
          disconnect()
        }
      })
      handleClose()
    }
    catch (err) {
      const error = parseErrors(err);
      handleError(error.errors);
      disconnect()
      handleClose()
    }
  }

  return (
    <div className="w-full h-full fixed top-0 lef-0 right-0 bottom-0 z-[999] bg-[#00000099] ">
      <div className="contain w-full h-full flex items-center justify-center  ">
        <div className="w-full md:w-[80%] h-auto relative bg-white px-4 md:px-8 pt-4 lg:pt-[42px] pb-6 flex flex-col gap-y-8 lg:gap-y-12 ">
          <Icon
            icon="ic:outline-cancel"
            onClick={handleClose}
            className="text-2xl lg:text-[32px] absolute cursor-pointer right-4 lg:right-5 top-5"
          />
          <h1 className="font-Playfair text-xl lg:text-[25px] font-bold">
            Log in as
          </h1>
          <div className=" space-y-10 lg:space-y-14 w-full flex flex-col items-center">
            <div className="grid w-full lg:grid-cols-2 gap-6 lg:gap-x-10">
              <div
                className="w-full h-[119px] lg:h-[267px] relative cursor-pointer "
                onClick={() => {
                  handleConnect("ARTIST")
                }}
              >
                <Image
                  src="/art_collector.png"
                  fill
                  className={`object-cover transition-all  ease-in-out duration-500  `}
                  alt="Blog_image"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0  w-full h-full bg-[#000000]/80 text-white flex justify-center items-center ">
                  <h1 className="font-Playfair text-xl lg:text-[27px] font-bold ">
                    Artists or Collector
                  </h1>
                </div>
              </div>
              <div
                className="w-full h-[119px] lg:h-[267px] relative cursor-pointer "
                onClick={() => {
                  handleConnect("GALLERY")
                }}
              >
                <Image
                  src="/art_gallery.png"
                  fill
                  className={`object-cover transition-all  ease-in-out duration-500  `}
                  alt="Blog_image"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0  w-full h-full bg-[#000000]/80 text-white flex justify-center items-center ">
                  <h1 className="font-Playfair text-xl lg:text-[27px] font-bold ">
                    Art Gallery
                  </h1>
                </div>
              </div>
            </div>
            <Button
              text="Close"
              action={handleClose}
              className="py-4 lg:px-32 "
              textStyles="w-[144px] lg:w-[183px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
