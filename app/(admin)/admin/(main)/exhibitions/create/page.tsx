import React from "react";
import Header from "../../header";
import FormComp from "./Form";
import { getUserGalleriesandArtists } from "@/actions";

const CreateCollectible = async () => {
  const galleries = await getUserGalleriesandArtists();
  return (
    <div className="w-full  h-full">
      <Header title="Create Exhibition" />
      <FormComp galleries = {galleries} />
    </div>
  );
};

export default CreateCollectible;
