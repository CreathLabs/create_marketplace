"use client";
import { approveArtwork, rejectDeleteArtwork, getUser } from "@/actions";
import Button from "@/components/Button";
import { handleError, parseErrors } from "@/lib/helpers";
import { Art } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { pinJSONToIPFS } from "@/app/providers/web3StorageClient";
import axios from 'axios';


const Buttons = ({ artwork }: { artwork: Art }) => {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const router = useRouter();

  const approve = async () => {
    try{
      if (artwork?.art_image) {
        setApproving(true);
        const artist = await getUser(artwork.user_id);
        let ipfsHash = await pintoIPFS(artwork.art_image);
        const tokenURI = `data:application/json;base64,${Buffer.from(JSON.stringify({"description" : `${artwork.description}`, "image" : `${ipfsHash}`, "name" : `${artwork.name}`})).toString("base64")}`;
        // let Txn = await MintingContract.mint(CollectionWallet.address, tokenURI)
        // console.log(Txn)
        // const mintReceipt = await Txn.wait()
        // console.log(mintReceipt)
        // let nft_id = parseInt(mintReceipt.events[0].args[2]._hex, 16)
        // let UnitPrice = ethers.utils.parseUnits(artwork.floor_price.toString(), 6)
        // let Txn2 = await ListingContract.listItem(contractAddress, artist?.wallet_address, nft_id, UnitPrice)
        // const receipt = await Txn2.wait()
        // console.log(receipt);
        const res = await fetch("/api/mint", {
          method: "POST",
          body: JSON.stringify({
            tokenURI: tokenURI,
            artistWallet: artist?.wallet_address,
            floor_price: artwork.floor_price
          }),
          headers: { "Content-Type": "application/json" }
        });
        const { nft_id } = await res.json();
        await approveArtwork(artwork.id, `${nft_id}`);
        toast.success("Artwork approved Successful");
        router.push("/admin/artworks");      
      } else {
        console.error("Artwork image is null");
      }
    }
    catch(err){
      const error = parseErrors(err);
      handleError(error.errors);
      console.error(err)
    }finally {
      setApproving(false);
    }
  };

  const pintoIPFS = async (url: string) => {
    try{
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const pinData = new FormData();
      const mimeType = response.headers['content-type'] || 'application/octet-stream';
      const extension = mimeType.split('/')[1] || 'bin';
      const blob = new Blob([response.data], { type: mimeType });
      pinData.append("file", blob, `file.${extension}`);
      const result = await pinJSONToIPFS(pinData);
      if ('pinataUrl' in result) {
        return result.pinataUrl
      } else {
        console.error("Pinning to IPFS failed:", result.message);
      }
    }
    catch(error){
      console.log(error);
    }
  }


  const reject = async () => {
    setRejecting(true);
    try {
      await rejectDeleteArtwork(artwork.id);
      toast.success("Artwork rejected Successful");
      router.push("/admin/artworks");
    } catch (error) {
      const err = parseErrors(error);
      handleError(err.errors);
    } finally {
      setRejecting(false);
    }
  };

  return (
    <>
      {artwork.is_approved ? (
        <div className="grid grid-cols-2 items-center gap-x-10 ">
          <Button
            text="Delete Artwork"
            action={reject}
            loading={rejecting}
            className="py-4 rounded-full border border-black bg-black text-white w-full"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center gap-x-10 ">
          <Button
            text="Approve Artwork"
            action={approve}
            loading={approving}
            className="py-4 rounded-full border border-black bg-black text-white w-full"
          />
          <Button
            text="Reject Artwork"
            action={reject}
            loading={rejecting}
            className="py-4 rounded-full border border-black bg-white text-black w-full"
          />
        </div>
      )}
    </>
  );
};

export default Buttons;
