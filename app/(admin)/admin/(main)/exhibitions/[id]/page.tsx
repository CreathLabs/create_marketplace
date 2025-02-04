import React from "react";
import Header from "../../header";
import FormComp from "./Form";
import { getExhibition } from "@/actions";
import { redirect } from "next/navigation";

const page = async ({
  params: { id },
  searchParams: { tab },
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) => {
  const data = await getExhibition(id);

  if (!data) {
    redirect("/admin/exhibitions");
  }
  return (
    <div className="w-full  h-full">
      <Header title="Exhibition Details" />
      <FormComp data={data} tab={tab} />
    </div>
  );
};

export default page;
