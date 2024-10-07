import React from "react";
import { getNotifications } from "@/actions";
import Header from "../header";
import Table from "./Table";

const NofifPage = async () => {
  const notifs = await getNotifications();

  if (!notifs) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Notifications" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <h1 className="text-lg leading-[44px] text-black font-bold ">
            All Notifications
          </h1>
          <Table notifs={notifs} />
        </div>
      </div>
    </div>
  );
};

export default NofifPage;
