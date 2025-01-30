import React from "react";
import { getNotifications } from "@/actions";
import Header from "../header";
import Table from "./Table";
import Link from "next/link";

const NofifPage = async () => {
  const notifs = await getNotifications();

  if (!notifs) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Notifications" />
      <div className="px-10 py-8 space-y-6">
        <div className="grid grid-cols-2 gap-x-10">
          <Link
            href="/admin/notifications/uploaded"
            className="py-8 px-6 w-full bg-black rounded "
          >
            <h1 className="text-lg font-bold text-white">Uploaded Artworks</h1>
          </Link>
          <Link
            href="/admin/notifications/flagged"
            className="py-8 px-6 w-full bg-black rounded "
          >
            <h1 className="text-lg font-bold text-white">Flagged Artworks</h1>
          </Link>
        </div>
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
