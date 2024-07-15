import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import GoogleSvg from "@/public/google.svg";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-3">
        <h1 className="font-Playfair font-bold text-3xl leading-[60px] tracking-[3%] ">
          Login with your email
        </h1>
        <h3 className="text-mainGray text-lg leading-[45px] ">
          Enter registered Email Address Below
        </h3>
      </div>

      <div className="space-y-12">
        <div className="space-y-6">
          <Input
            placeholder="Email Address"
            label="Enter Email Address"
            value=""
            type="email"
          />
          <div className="space-y-3">
            <Input
              placeholder="Enter Password"
              label="Enter Password"
              value=""
              type="password"
            />
            <div className="flex justify-end w-full">
              <h1>Forgot Password?</h1>
            </div>
          </div>
        </div>
        <Button text="Log In" className="py-4 w-full" />
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
        <h1>
          Are you new here?{" "}
          <span className="font-bold ">
            <Link href="/auth/register">Create Account</Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
