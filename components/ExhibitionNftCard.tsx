"use client";
import { Art } from "@prisma/client";
import ImageWithPopup from "./ImageWithPopup";
import Link from "next/link";
import React from "react";
import { DeleteButton } from "./buttons";
import { usePathname } from "next/navigation";
import CreathABI from "@/app/providers/ABI/creathABI.json";
import { ethers } from "ethers";

interface ArtProps extends Art {}

const ExhibitionNftCard: React.FC<ArtProps> = ({
  id,
  art_image,
  name,
  floor_price,
  nft_id,
  exhibition_id,
  contract
}) => {
  // const creathAddress = '0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6'; // for listing items on the marketplace and also contains the buy function.
  // const PROVIDER = "https://optimism-rpc.publicnode.com"
  // const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
  // const CollectionWallet = 'private key goes here'
  // const signer = new ethers.Wallet(CollectionWallet, provider);
  // const ListingContract = new ethers.Contract(creathAddress, CreathABI, signer );
  const pathname = usePathname();

  const ext = art_image?.split(".");
  const isVideo =
    ext?.[ext.length - 1] && ext?.[ext.length - 1]?.includes("mp4");

  const isAdmin = pathname.includes("admin");

  const getTransformedImage = (img?: string) => {
    if (!img || !img.includes("media.publit.io")) return img;

    const file = img.substr(0, img.lastIndexOf(".")) + ".webp";
    const adding = "q_80,w_600,h_600,c_fill/";
    const newString = file.slice(0, 29) + adding + file.slice(29);
    return newString;
  };

  // const updatePrice = async()=>{
  //   const txn = await ListingContract.updateListing(contract, "0x33B5E1DaF11b12103682fB77031111736aADAa5C", nft_id, ethers.utils.parseUnits("600", 6))
  //   const receipt = await txn.wait();
  //   console.log(receipt)
  // }

  return (
    <div className="w-full min-w-[323px] h-full  space-y-4 cursor-pointer ">
      {/* <button onClick={()=>{updatePrice()}}>Update Price</button> */}
      <div className="bg-grayTwo relative w-full  h-[370px] ">
        {!isVideo ? (
          <ImageWithPopup
            src={getTransformedImage(art_image || undefined) || "/featured.png"}
            alt="Image"
            className="object-cover p-5"
          />
        ) : (
          <video
            src={art_image!}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover  p-5 absolute"
          />
        )}
      </div>
      <div className="space-y-2 md:space-y-3">
        <div className="space-y-3 md:space-y-4">
          <Link
            href={
              isAdmin
                ? `/admin/exhibitions/${exhibition_id}/artworks/${id}`
                : `/exhibitions/${exhibition_id}/artworks/${id}`
            }
          >
            <h1 className=" text-xl md:text-[22px] font-Playfair font-black ">
              {name}
            </h1>
          </Link>
          <div className="flex justify-between w-full items-center ">
            <h1 className="text-black text-base md:text-lg font-bold ">
              {`${floor_price} USDC`}
            </h1>
            {isAdmin && <DeleteButton id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionNftCard;
