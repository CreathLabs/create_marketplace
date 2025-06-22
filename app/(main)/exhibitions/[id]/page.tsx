import { getExhibition, getExhibitionArtworks } from "@/actions";
import Button from "@/components/Button";
import EmptyComponent from "@/components/EmptyComponent";
import ExhibitionNftCard from "@/components/ExhibitionNftCard";
import Pagination from "@/components/pagination";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ExhibitionDetails = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  let data = null;
  try {
    const res = await getExhibition(id);
    data = res;
  } catch (error) {
    console.log(error);
  }

  const { data: artworks, total, ipp } = await getExhibitionArtworks(id, page);

  if (!data) {
    redirect("/");
  }

  return (
    <div className="w-full h-full space-y-14">
      <div className="w-full h-full space-y-5 lg:space-y-10 ">
        <div className="w-full h-[211px] lg:h-[345px] relative  ">
          <Image
            src={data.cover_image || "/artist_cover.png"}
            className="object-cover"
            fill
            alt="Aritst cover"
          />
          <div className="absolute hidden top-[65%] left-0 bottom-0 right-0 contain lg:flex lg:justify-end">
            <div className="bg-grayTwo relative lg:w-[36%] sm:w-full md:w-full  flex flex-col gap-y-12  h-fit p-8 ">
              <div className="space-y-4">
                <h3 className="text-lg font-bold ">Date</h3>
                <h2 className="font-bold text-2xl font-Playfair ">
                  {moment(data.date).format("Do MMM YY")}
                </h2>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold ">Time</h3>
                <h2 className="font-bold text-2xl font-Playfair ">
                  {moment(data.time).format("h:mm A")}
                </h2>
              </div>
              <div className="space-y-4 overflow-hidden">
                {
                  data.address === "Virtual" || data.location === "Virtual" || data.country === "Virtual" ?
                  <></>
                  :
                  <>
                    <h3 className="text-lg font-bold ">Venue</h3>
                    <h2 className="font-bold text-2xl font-Playfair ">
                        {`${data.address}, ${data.location}, ${data.country}`}
                    </h2>
                  </>
                }
              </div>

              <Link href="#gallery">
                <button
                  className={
                    "text-black font-semibold px-3 py-[14px] text-sm lg:text-base leading-[23.22px] flex justify-center items-center gap-x-4 border-b-2 border-black"
                  }
                >
                  <h1 className={"w-[183px]"}>View Gallery</h1>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="contain space-y-14 lg:space-y-[160px] ">
          <div className="w-full space-y-4 lg:space-y-8 lg:max-w-[50%]">
            <h1 className="font-Playfair font-bold text-[22px] lg:text-[35px] leading-[46px] ">
              {data.name}
            </h1>
            <div className="flex flex-col space-y-10 w-full">
              <h3 className="font-semibold text-base lg:text-xl leading-9 tracking-[5%] ">
                {data.description.length > 400
                  ? `${data.description.substring(0, 400)}...`
                  : data.description}
              </h3>
              <div className="flex items-center justify-between lg:justify-start lg:space-x-[123px]   ">
                <div className="space-y-4">
                  <h2 className="text-sm lg:text-lg text-mainGray font-semibold ">
                    Artists
                  </h2>
                  <h1 className="text-base lg:text-[22px] font-bold ">
                    {data.artist_name}
                  </h1>
                </div>
                <div className="space-y-4">
                  <h2 className="text-sm lg:text-lg text-mainGray font-semibold ">
                    Curator
                  </h2>
                  <h1 className="text-base lg:text-[22px] font-bold ">
                    {data.curator_name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-grayTwo lg:hidden w-full flex flex-col items-center space-y-10 h-fit py-6 px-4 ">
            <div className="space-y-4 w-full">
              <h3 className="text-base font-bold ">Date</h3>
              <h2 className="font-bold text-[22px] font-Playfair ">
                {moment(data.date).format("Do MMM YY")}
              </h2>
            </div>
            <div className="space-y-4 w-full">
              <h3 className="text-base font-bold ">Time</h3>
              <h2 className="font-bold text-[22px] font-Playfair ">
                {moment(data.time).format("h:mm A")}
              </h2>
            </div>
            <div className="space-y-4 overflow-hidden w-full">
              {
               data.address === "Virtual" || data.location === "Virtual" || data.country === "Virtual" ?
                <></>
                :
                <>
                  <h3 className="text-base font-bold ">Venue</h3>
                  <h2 className="font-bold text-[22px] font-Playfair  ">
                    {`${data.address}, ${data.location}, ${data.country}`}
                  </h2> 
                </>
              }
            </div>
            <Link href="#gallery">
              <button
                className={
                  "text-black font-semibold px-3 py-[14px] text-sm lg:text-base leading-[23.22px] flex justify-center items-center gap-x-4 border-b-2 border-black"
                }
              >
                <h1 className={"w-[183px]"}>View Gallery</h1>
              </button>
            </Link>
          </div>
          <div className="space-y-6">
            <h1 className="font-Playfair font-bold text-xl lg:!text-3xl ">
              Featured Artworks
            </h1>
            {artworks?.length > 0 ? (
              <>
                <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {artworks.map((n) => (
                    <ExhibitionNftCard key={n.id} {...n} />
                  ))}
                </div>
                {total > ipp && (
                  <div className="w-full flex justify-center">
                    <Pagination
                      itemsPerPage={ipp}
                      page={page}
                      totalItems={total}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="py-16">
                <EmptyComponent
                  text="Oops! This are no featured artworks at the moment"
                  className="max-w-[630px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="gallery"
        className="space-y-10 lg:space-y-12 flex flex-col  pb-[96px] items-center"
      >
        {data?.images?.length > 0 ? (
          <>
            <h1 className="font-Playfair font-bold text-xl lg:!text-3xl ">
              Picture Gallery
            </h1>
          
            <div className="container max-w-screen-xl mx-auto pl-6 ">
              <div className="w-full scroller flex gap-x-6 lg:gap-x-10 overflow-x-auto last:pr-6 lg:last:pr-0">
                {data.images.map((n, index) => (
                  <div
                    key={index}
                    className=" min-w-[calc(100vw/1.2)] lg:min-w-[520px]  h-[367px] relative "
                  >
                    <Image
                      src={n}
                      fill
                      className="w-full object-cover h-full"
                      alt="Exh Gallery"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ExhibitionDetails;
