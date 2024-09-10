"use client";
import React, { useState } from "react";
import Modal from "./modal";
import Header from "./header";
import Footer from "./footer";
import MenuContextProvider from "@/contexts/menuContext";
import Menu from "./menu";
import { User } from "@prisma/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Provider = ({
  children,
  current,
}: {
  children: React.ReactNode;
  current: User | null;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <MenuContextProvider>
      <>
        <Menu />
        <Header openModal={() => setShowModal(true)} current={current} />
        {children}
        <Footer />
        {showModal && <Modal handleClose={() => setShowModal(false)} />}
      </>
      <ProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </MenuContextProvider>
  );
};

export default Provider;
