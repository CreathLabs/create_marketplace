import React from "react";
import Header from "../header";
import { getAdminProfile } from "@/actions";
import FormComp from "./Form";

const Settings = async () => {
  const res = await getAdminProfile();

  return (
    <div className="w-full  h-full">
      <Header title="Transactions" showLogout />
      <div className="px-10 py-8 space-y-6">
        <FormComp profile={res!} />
      </div>
    </div>
  );
};

export default Settings;
