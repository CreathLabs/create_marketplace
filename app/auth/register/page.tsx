"use client";
import Button from "@/components/Button";
import Image from "next/image";
import GoogleSvg from "@/public/google.svg";
import React from "react";
import Link from "next/link";
import SignUpForm from "./Form";

const RegisterPage = () => {
  return (
    <div className="w-full py-8 space-y-8">
      <div className="space-y-6 lg:space-y-3">
        <h1 className="font-Playfair font-bold text-[22px] leading-[29px] lg:text-3xl lg:leading-[60px] tracking-[3%] ">
          Create New Account
        </h1>
        <h3 className="text-mainGray text-[15px] lg:text-lg lg:leading-[45px] ">
          Enter Email Address Below
        </h3>
      </div>

      <div className="space-y-12">
        <SignUpForm />
      </div>
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="w-full flex items-center relative justify-center">
            <div className="absolute w-full left-0 right-0 border-t border-[#F0F2F5] "></div>
            <h1 className="text-sm text-[#667185] px-2 z-[10] bg-white ">Or</h1>
          </div>
          <Button
            text="Continue with Google"
            className="w-full py-[14px] "
            leadingAccessory={<Image src={GoogleSvg} alt="" />}
          />
        </div>
        <h1 className="text-[15px] lg:text-base ">
          Do you have an Account?{" "}
          <span className="font-bold ">
            <Link href="/auth/login">Sign In Here</Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default RegisterPage;
