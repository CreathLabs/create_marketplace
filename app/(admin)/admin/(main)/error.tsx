"use client";
import React from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full h-full min-h-screen text-3xl flex flex-col justify-center gap-y-10 items-center">
      <h2>Something went wrong!</h2>
      <button
        className="text-xl bg-black text-white py-2 px-4 rounded-full"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};

export default error;
