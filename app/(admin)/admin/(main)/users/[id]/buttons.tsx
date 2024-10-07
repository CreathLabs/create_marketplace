"use client";
import Button from "@/components/Button";
import React from "react";

const Buttons = () => {
  return (
    <>
      <Button
        text="Disable Account"
        action={() => {}}
        loading={false}
        className="py-4 rounded-full border border-black bg-black text-white w-full"
      />
    </>
  );
};

export default Buttons;
