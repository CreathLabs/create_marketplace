"use client";
import React, { useContext, useState } from "react";
import Modal from "./modal";
import Header from "./header";
import Footer from "./footer";
import MenuContextProvider, { MenuContext } from "@/contexts/menuContext";
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
  return (
    <MenuContextProvider>
      <Main current={current}>{children}</Main>
    </MenuContextProvider>
  );
};

export default Provider;

const Main = ({
  children,
  current,
}: {
  children: React.ReactNode;
  current: User | null;
}) => {
  const { showModal, setShowModal } = useContext(MenuContext);

  return (
    <>
      <Menu current={current} openModal={() => setShowModal(true)} />
      <Header openModal={() => setShowModal(true)} current={current} />
      {children}
      <Footer />
      {showModal && <Modal handleClose={() => setShowModal(false)} />}
      <ProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
