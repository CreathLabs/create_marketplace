import React from "react";
import { getCategories, getExhibitionArtwork } from "@/actions";
import UploadExhibitionArt from "./Form";
import Header from "../../../../header";
import { redirect } from "next/navigation";

const UploadArtwork = async ({
  params: { artId },
}: {
  params: { artId: string };
}) => {
  const categories = await getCategories();
  const data = await getExhibitionArtwork(artId);

  if (!data) {
    redirect("/admin/exhibitions");
  }

  return (
    <div className="w-full  h-full">
      <Header title="Upload Artwork" />
      <UploadExhibitionArt categories={categories} data={data} />
    </div>
  );
};

export default UploadArtwork;
