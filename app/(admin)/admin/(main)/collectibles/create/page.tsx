import React from "react";
import Header from "../../header";
import FormComp from "./Form";

const CreateCollectible = () => {
  return (
    <div className="w-full  h-full">
      <Header title="Create Collectible" />
      <FormComp />
    </div>
  );
};

export default CreateCollectible;
