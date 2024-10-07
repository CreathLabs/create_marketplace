import React from "react";
import { getAdminArtworks, getArtworksStats } from "@/actions";
import Header from "../header";
import Table from "./Table";

const ArtworksPage = async () => {
  let dashStat = null;

  const res = await getArtworksStats();
  const artworks = await getAdminArtworks();
  dashStat = res;

  if (!dashStat || !artworks) {
    return null;
  }

  const { artworksCount, artworksSold, collectorsCount } = dashStat;

  const stats = [
    { title: "Artworks", value: artworksCount },
    { title: "Collectors", value: collectorsCount },
    { title: "Artworks Sold ", value: artworksSold },
  ];

  return (
    <div className="w-full  h-full">
      <Header title="Artworks" />
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

        <div className="space-y-3">
          <h1 className="text-lg leading-[44px] text-black font-bold ">
            Artwork Listing
          </h1>
          <Table artworks={artworks} />
        </div>
      </div>
    </div>
  );
};

export default ArtworksPage;
