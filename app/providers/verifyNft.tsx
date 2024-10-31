"use client";

import { useEffect, useState } from "react";
import { useConnect, useEthereum } from "@particle-network/authkit";
import { ethers } from "ethers";
import Button from "@/components/Button";
import CreathABI from "./ABI/CreathABI.json";
import ABI from './ABI/ContractABI.json';
import MockABI from './ABI/MockABI.json';
import { handleError, parseErrors } from "@/lib/helpers";
import { User } from "@prisma/client";




interface VerifyButtonProps {
    id: string;
    current: User | null,
    price: string
}

const VerifyButton: React.FC<VerifyButtonProps> =  ( { id, current, price } )=>{
    const { connected, connectionStatus } = useConnect();
    const [checkContract, setCheck] = useState<ethers.Contract | null>(null);
    const [mockContract, setMock] = useState<ethers.Contract | null>(null);
    const [buyContract, setContract] = useState<ethers.Contract | null>(null)
    const [address, setAddress] = useState("");
    const [ verified, setVerified ] = useState(false);
    const [ available, setAvailable ] = useState(false);
    const contractAddress = '0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6'; //it is the same contract for buying and listing items, it is also used in artistProfile and profile js files
    const creathAddress = "0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994";
    const mockContractAddress = "0x7f5c764cbc14f9669b88837ca1490cca17c31607"
    const nft = "16";
    const { provider } = useEthereum()

    useEffect(()=>{
        const assignContracts = async ()=>{
            try{
                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const accounts = await ethersProvider.listAccounts();
                const signer = ethersProvider.getSigner(accounts[0]);
                setAddress(accounts[0])
                const CheckContract = new ethers.Contract("0x220D490F166CCF5289C7c806288C7A24f663b29C", CreathABI, ethersProvider);
                const ContractInstance = new ethers.Contract(contractAddress, ABI, signer);
                const MockContract = new ethers.Contract(mockContractAddress, MockABI, signer);
                setMock(MockContract)
                setContract(ContractInstance)
                setCheck(CheckContract);
            }
            catch(err){
                console.log(err)
            }
        }

        assignContracts()
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

    const handleBuy =  async ()=>{
        if(current){
            try{
                let NFTprice = ethers.utils.parseUnits(price, 6)
                let id = ethers.BigNumber.from(nft);
                try{
                    let allowance = await mockContract?.allowance(address, contractAddress);
                    if(2000 > parseInt(allowance._hex, 16)){
                      let Txn = await mockContract?.approve(contractAddress, `${parseInt(NFTprice._hex)}`)
                      let rec = await Txn.wait()
                    }
                  }
                  catch(err){
                    const error = parseErrors(err);
                    handleError(error.errors);
                  }
            }
            catch(err){
                const error = parseErrors(err);
                handleError(error.errors);
            }
        }
    }

    return(
        <Button
            text={available ? "Buy Now" : "Sold"}
            textStyles=" w-[144px] lg:w-[183px]"
            className="text-white border-white"
            disabled = {!available}
            loading =  {connectionStatus === "disconnected" ? false : !verified }
            action={handleBuy}
        />
    )
}

export default VerifyButton