"use client";

import { useEffect, useState } from "react";
import { useConnect, useEthereum } from "@particle-network/authkit";
import { ethers } from "ethers";
import Button from "@/components/Button";
import CreathABI from "./ABI/CreathABI.json";
import { handleError, parseErrors } from "@/lib/helpers";


interface VerifyButtonProps {
    id: string;
}

const VerifyButton: React.FC<VerifyButtonProps> =  ( { id } )=>{
    const { connected, connectionStatus } = useConnect();
    const [checkContract, setCheck] = useState<ethers.Contract | null>(null);
    const [ verified, setVerified ] = useState(false);
    const [ available, setAvailable ] = useState(false);
    const creathAddress = "0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994";
    const nft = "16";
    const { provider } = useEthereum()

    useEffect(()=>{
        try{
            const ethersProvider = new ethers.providers.Web3Provider(provider)
            const CheckContract = new ethers.Contract("0x220D490F166CCF5289C7c806288C7A24f663b29C", CreathABI, ethersProvider)
            setCheck(CheckContract);
        }
        catch(err){
            console.log(err)
        }
    }, [connected])

    useEffect(() => {
        // Only run checkArtwork if checkContract has been set
        if (checkContract) {
            checkArtwork();
        }
    }, [checkContract]);

    const checkArtwork = async()=>{
        try{
            if(checkContract){
                let txn =  await checkContract.ownerOf(nft);
                if(txn === "0x33B5E1DaF11b12103682fB77031111736aADAa5C"){
                    setVerified(true);
                    setAvailable(true)
                }
                else{
                    setVerified(true)
                    setAvailable(false)
                }
            }
        }
        catch(err){
            setVerified(true)
            const error = parseErrors(err);
            handleError(error.errors);
        }
    }

    return(
        <Button
            text={available ? "Buy Now" : "Sold"}
            textStyles=" w-[144px] lg:w-[183px]"
            className="text-white border-white"
            disabled = {!available}
            loading =  {connectionStatus === "disconnected" ? false : !verified }
        />
    )
}

export default VerifyButton