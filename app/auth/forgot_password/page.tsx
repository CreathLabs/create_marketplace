import React from "react";
import { ForgotPassword } from "./Form";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full py-8 space-y-8">
      <div className="space-y-6 lg:space-y-3">
        <h1 className="font-Playfair font-bold text-[22px] leading-[29px] lg:text-3xl lg:leading-[60px] tracking-[3%] ">
          Email Verification
        </h1>
        <h3 className="text-mainGray text-[15px] lg:text-lg lg:leading-[45px] ">
          Enter registered Email Address Below
        </h3>
      </div>

      <div className="space-y-12">
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
