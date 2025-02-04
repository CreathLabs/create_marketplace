import React from "react";
import UploadArtworkForm from "./Form";
import { getCategories } from "@/actions";

const UploadArtwork = async () => {
  const categories = await getCategories();
  return (
    <div className="py-10 contain lg:min-h-[calc(100vh-70px)] space-y-10 lg:space-y-24">
      <h1 className=" text-[28px] lg:text-[40px] font-bold font-Playfair ">
        Upload Artwork
      </h1>
      <UploadArtworkForm categories={categories} />
    </div>
  );
};

export default UploadArtwork;
