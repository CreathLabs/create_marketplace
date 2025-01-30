"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default MainProvider;
