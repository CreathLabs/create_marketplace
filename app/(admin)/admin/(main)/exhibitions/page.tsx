import React from "react";
import { getAdminExhibitions } from "@/actions";
import Header from "../header";
import Table from "./Table";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

const NofifPage = async () => {
  const exhibs = await getAdminExhibitions();

  if (!exhibs) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Exhibitions" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              Exhibitions Listing
            </h1>
            <div>
              <Button
                text="Add New"
                action={async () => {
                  "use server";
                  redirect("/admin/exhibitions/create");
                }}
                textStyles="text-[13px]"
                className="py-2 w-[106px]  rounded-full border-none bg-black text-white"
              />
            </div>
          </div>
          <Table exhibs={exhibs} />
        </div>
      </div>
    </div>
  );
};

export default NofifPage;
