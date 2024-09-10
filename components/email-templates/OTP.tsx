import React from "react";

const OtpEmailTemplate = ({ otp }: { otp: string }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-2xl font-semibold">Your OTP Code</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-lg leading-relaxed">Hello,</p>
          <p className="text-gray-700 mt-2 text-lg leading-relaxed">
            You requested a one-time password (OTP) to verify your identity.
            Please use the code below to proceed:
          </p>
          <div className="mt-4 mb-8">
            <p className="text-center text-3xl font-bold text-gray-800 tracking-widest">
              {otp}
            </p>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            This code is valid for the next 10 minutes. If you did not request
            this code, please ignore this email.
          </p>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">Thank you!</p>
            <p className="text-gray-600 text-sm">The [Your Company] Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpEmailTemplate;
