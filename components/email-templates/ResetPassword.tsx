import React from "react";

interface ResetPasswordEmailProps {
  username: string;
  resetPasswordUrl: string;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  username,
  resetPasswordUrl,
}) => {
  return (
    <div
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      style={{ fontFamily: "'Arial', sans-serif" }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Password Reset Request
        </h1>
        <p className="text-gray-600 mb-6">
          Hi <span className="font-semibold">{username}</span>,
        </p>
        <p className="text-gray-600 mb-6">
          We received a request to reset your password. Click the button below
          to proceed:
        </p>
        <a
          href={resetPasswordUrl}
          className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reset Password
        </a>
        <p className="text-gray-600 mt-6">
          If you did not request this, you can safely ignore this email.
        </p>
        <hr className="my-6 border-gray-200" />
        <p className="text-sm text-gray-500">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
