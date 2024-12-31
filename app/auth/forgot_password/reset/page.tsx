import React from "react";
import { ResetPassword } from "./Form";

const VerifyOtpPage = ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  return (
    <div className="w-full py-8 space-y-8">
      <div className="space-y-6 lg:space-y-3">
        <h1 className="font-Playfair font-bold text-[22px] leading-[29px] lg:text-3xl lg:leading-[60px] tracking-[3%] ">
          Set New Password
        </h1>
        <h3 className="text-mainGray text-[15px] lg:text-lg lg:leading-[45px] ">
          Enter your new password Below
        </h3>
      </div>

      <div className="space-y-12">
        <ResetPassword token={token} />
      </div>
    </div>
  );
};

export default VerifyOtpPage;
