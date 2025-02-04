import React from "react";
import { getCategories } from "@/actions";
import UploadExhibitionArt from "./Form";
import Header from "../../../header";

const UploadArtwork = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const categories = await getCategories();
  return (
    <div className="w-full  h-full">
      <Header title="Upload Artwork" />
      <UploadExhibitionArt categories={categories} exhibition_id={id} />
    </div>
  );
};

export default UploadArtwork;
