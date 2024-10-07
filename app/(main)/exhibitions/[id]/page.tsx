import { getExhibition, getTopNfts } from "@/actions";
import Button from "@/components/Button";
import NftCard from "@/components/NftCard";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const ExhibitionDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  let data = null;
  try {
    const res = await getExhibition(id);
    data = res;
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    redirect("/");
  }

  const nfts = await getTopNfts();

  return (
    <div className="w-full h-full space-y-10 ">
      <div className="w-full h-[345px] relative  ">
        <Image
          src="/artist_cover.png"
          className="object-cover"
          fill
          alt="Aritst cover"
        />
        <div className="absolute top-[65%] left-0 bottom-0 right-0 contain lg:flex lg:justify-end">
          <div className="bg-grayTwo relative lg:w-[36%] sm:w-full md:w-full space-y-12  h-fit p-8 ">
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Date</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                23 July 2024
              </h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Time</h3>
              <h2 className="font-bold text-2xl font-Playfair ">02:00 PM</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold ">Venue</h3>
              <h2 className="font-bold text-2xl font-Playfair ">
                24 Blue Road, Lekki Lagos. Nigeria
              </h2>
            </div>
            <Button text="View Gallery" textStyles="w-[183px]" />
          </div>
        </div>
      </div>
      <div className="contain space-y-[105px] ">
        <div className="w-full lg:space-y-8 space-y-80 lg:max-w-[50%]">
          <h1 className="font-Playfair font-bold text-[35px] leading-[46px] ">
            {data.name}
          </h1>
          <div className="flex flex-col space-y-10 w-full">
            <h3 className="font-semibold text-xl leading-9 tracking-[5%] ">
              {data.description.length > 400
                ? `${data.description.substring(0, 400)}...`
                : data.description}
            </h3>
            <div className="flex items-center justify-between md:max-w-[50%] sm:max-w-[100%] ">
              <div className="space-y-4">
                <h2 className="text-lg text-mainGray font-semibold ">
                  Artists
                </h2>
                <h1 className="text-[22px] font-bold ">Chuma Anagbado</h1>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg text-mainGray font-semibold ">
                  Curator
                </h2>
                <h1 className="text-[22px] font-bold ">Ike Anago</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-[98px] space-y-6">
          <h1 className="font-Playfair font-bold !text-3xl ">
            Featured Artworks
          </h1>
          <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8">
            {nfts.map((n) => (
              <NftCard key={n.id} {...n} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetails;
