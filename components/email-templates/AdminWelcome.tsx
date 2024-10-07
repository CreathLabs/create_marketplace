import React from "react";

const AdminWelcomeEmail = ({
  adminName,
  adminEmail,
  adminPassword,
}: {
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {adminName}!
        </h1>
        <p className="text-gray-600 mb-4">
          You have been added as an admin to our system. Below are your login
          details:
        </p>
        <div className="mb-4">
          <p className="text-gray-800 font-medium">Email:</p>
          <p className="text-gray-600">{adminEmail}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-800 font-medium">Temporary Password:</p>
          <p className="text-gray-600">{adminPassword}</p>
        </div>
        <p className="text-gray-600">
          Please log in and update your password as soon as possible.
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomeEmail;
