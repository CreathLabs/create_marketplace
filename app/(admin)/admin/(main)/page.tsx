import React from "react";
import Header from "./header";
import { getAdminDashStats, getTopArtistsAndGalleries } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import moment from "moment";
import Toggler from "@/components/toggler";

const Dashboard = async ({ searchParams }: { searchParams: any }) => {
  const type = searchParams?.type || "users";
  let dashStat = null;

  const res = await getAdminDashStats();
  const artistsGalleries = await getTopArtistsAndGalleries();
  dashStat = res;

  if (!dashStat || !artistsGalleries) {
    return null;
  }

  const { artistsCount, artworksCount, collectorsCount } = dashStat;
  const { artists, galleries } = artistsGalleries;

  const stats = [
    { title: "Collectors", value: collectorsCount },
    { title: "Artists", value: artistsCount },
    { title: "Artworks", value: artworksCount },
  ];

  return (
    <div className="w-full  h-full">
      <Header title="Dashboard" />
      <div className="px-10 py-8 space-y-6">
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

        <div className="space-y-8">
          <Toggler type={type} />
          <div className="space-y-3">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              User Listing
            </h1>
            <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
              <div className="grid grid-cols-4 w-full bg-grayTwo py-4 px-6   ">
                {[
                  {
                    title: "Email Address",
                    icon: "material-symbols:person",
                  },
                  {
                    title: "Username",
                    icon: "ph:bank-fill",
                  },
                  {
                    title: "Artworks",
                    icon: "heroicons:identification-20-solid",
                  },
                  {
                    title: "Creation Date",
                    icon: "clarity:date-solid",
                  },
                ].map((item) => (
                  <div
                    key={item.icon}
                    className="w-full flex items-center space-x-2 "
                  >
                    <Icon icon={item.icon} className="!text-base" />
                    <h1 className="font-bold text-sm">{item.title}</h1>
                  </div>
                ))}
              </div>
              <div className="">
                {(type === "users" ? artists : galleries).map(
                  (artist, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 w-full h-auto  py-4 px-6   "
                    >
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={
                            artist.profile_image ||
                            `https://api.dicebear.com/9.x/initials/png?seed=${artist?.username}`
                          }
                          width={32}
                          height={32}
                          className="rounded-full w-8 h-8"
                          alt=""
                        />
                        <h1 className="text-sm text-[#2D3748] font-medium ">
                          {artist.email}
                        </h1>
                      </div>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {artist.username}
                      </h1>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {artist?.artworks?.length || 0}
                      </h1>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {moment(artist.created_at).format("ll")}
                      </h1>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
