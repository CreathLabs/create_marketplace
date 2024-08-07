"use client";
import React, { useState } from "react";
import Modal from "./modal";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";
import MenuContextProvider from "@/contexts/menuContext";
import Menu from "./menu";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  return (
    <MenuContextProvider>
      <>
        <Menu />
        <Header openModal={() => setShowModal(true)} />
        {children}
        <Footer />
        {showModal && <Modal handleClose={() => setShowModal(false)} />}
      </>
    </MenuContextProvider>
  );
};

export default Provider;
