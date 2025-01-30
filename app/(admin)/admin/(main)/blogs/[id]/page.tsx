import React from "react";
import Header from "../../header";
import FormComp from "./Form";
import { getBlog } from "@/actions";
import { redirect } from "next/navigation";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const blog = await getBlog(id);

  if (!blog) {
    redirect("/admin/blogs");
  }

  return (
    <div className="w-full  h-full">
      <Header title="Edit Blog" />
      <FormComp blog={blog} />
    </div>
  );
};

export default page;
