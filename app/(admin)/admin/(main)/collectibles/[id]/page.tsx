import React from "react";
import Header from "../../header";
import FormComp from "./Form";
import { getBlog, getCollectible } from "@/actions";
import { redirect } from "next/navigation";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getCollectible(id);

  if (!data) {
    redirect("/admin/collectibles");
  }

  return (
    <div className="w-full  h-full">
      <Header title="Edit Blog" />
      <FormComp data={data} />
    </div>
  );
};

export default page;
