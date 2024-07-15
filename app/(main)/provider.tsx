"use client";
import React, { useState } from "react";
import Modal from "./modal";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {}
      <Header openModal={() => setShowModal(true)} />
      {children}
      <Footer />
      {showModal && <Modal handleClose={() => setShowModal(false)} />}
    </>
  );
};

export default Provider;
