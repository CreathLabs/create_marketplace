import React from "react";
import { VerifyOTP } from "./Form";

const VerifyOtpPage = ({
  searchParams: { email },
}: {
  searchParams: { email: string };
}) => {
  return (
    <div className="w-full py-8 space-y-8">
      <div className="space-y-6 lg:space-y-3">
        <h1 className="font-Playfair font-bold text-[22px] leading-[29px] lg:text-3xl lg:leading-[60px] tracking-[3%] ">
          Enter Authentication Code
        </h1>
        <h3 className="text-mainGray text-[15px] lg:text-lg lg:leading-[45px] ">
          Please check email inbox for authentication code
        </h3>
      </div>

      <div className="space-y-12">
        <VerifyOTP email={email} />
      </div>
    </div>
  );
};

export default VerifyOtpPage;
