import React from "react";
import Header from "../../header";
import FormComp from "./Form";
import { getUserGalleriesaAndArtists } from "@/actions";

const CreateCollectible = async () => {
  const galleries = await getUserGalleriesaAndArtists();
  return (
    <div className="w-full  h-full">
      <Header title="Create Exhibition" />
      <FormComp galleries = {galleries} />
    </div>
  );
};

export default CreateCollectible;
