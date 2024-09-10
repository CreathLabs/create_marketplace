import React from "react";
import Header from "./header";
import { getAdminDashStats } from "@/actions/admin/dashboard";
import { handleError, parseErrors } from "@/lib/helpers";

const Dashboard = async () => {
  let dashStat = null;

  const res = await getAdminDashStats();
  dashStat = res;

  if (!dashStat) {
    return null;
  }

  const { artistsCount, artworksCount, collectorsCount } = dashStat;

  const stats = [
    { title: "Collectors", value: collectorsCount },
    { title: "Artists", value: artistsCount },
    { title: "Artworks", value: artworksCount },
  ];

  return (
    <div className="w-full  h-full">
      <Header />
      <div className="px-10 py-8">
        <div className="grid grid-cols-3 gap-x-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="border border-[#0000000D] rounded  space-y-6 px-6 py-8 "
            >
              <h2 className="text-mainGray text-lg  ">{item.title}</h2>
              <h1 className="text-2xl font-bold ">{item.value}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
