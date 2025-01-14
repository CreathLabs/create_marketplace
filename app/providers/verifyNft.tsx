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
// import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';




interface VerifyButtonProps {
    id: string,
    current: User | null,
    price: string,
    Innertext: string,
    paymentType: string,
    artName: string
}

const VerifyButton: React.FC<VerifyButtonProps> =  ( { id, current, price, Innertext, paymentType, artName } )=>{
    const { connected, connectionStatus } = useConnect();
    const [checkContract, setCheck] = useState<ethers.Contract | null>(null);
    const [mockContract, setMock] = useState<ethers.Contract | null>(null);
    const [buyContract, setContract] = useState<ethers.Contract | null>(null)
    const [address, setAddress] = useState("");
    const [ verified, setVerified ] = useState(false);
    const [ available, setAvailable ] = useState(false);
    const [isSold, setSold] = useState(false)
    const contractAddress = '0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6'; //it is the same contract for buying and listing items, it is also used in artistProfile and profile js files
    const creathAddress = "0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994";
    const mockContractAddress = "0x7f5c764cbc14f9669b88837ca1490cca17c31607"
    const nft = "16";
    const { provider } = useEthereum();

    

    const config = {
        public_key: 'FLWPUBK-0b212880f051f3e79e3b654d97a61fb7-X',
        tx_ref: `${Date.now()}`,
        amount: Number(price),
        currency: 'USD',
        payment_options: 'card, banktransfer, ussd, account, credit',
        customer: {
        email: `${current ? current.email : ''}`,
        phone_number: ``,
        name: `${current ? current.username : ''}`,
        },
        customizations: {
        title: `Paying for artwork ${artName}`,
        description: 'Payment for an artwork on Creath Marketplace',
        logo: 'https://media.publit.io/file/creat-logo.webp',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);
    

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

        assignContracts();
    }, [connected])

    useEffect(() => {
        // Only un checkArtwork if checkContract has been set
        const verifyArtwork = async ()=>{
            if(current){
                if (checkContract) {
                    checkArtwork()
                }
            }
        }
        verifyArtwork()   
        
    }, [checkContract]);

    const transferArtwork = async()=>{
        
    }

    const checkArtwork = async()=>{
        try{
            if(checkContract){
                let txn =  await checkContract.ownerOf(nft);
                if(txn === "0x33B5E1DaF11b12103682fB77031111736aADAa5C"){
                    setVerified(true);
                    setAvailable(true);
                }
                else{
                    setVerified(true)
                    setAvailable(false)
                    setSold(true)
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
            if(paymentType === "Wallet"){
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
            else{
                try {
                    handleFlutterPayment({
                        callback: (response) => {
                        console.log("Flutterwave response:", response);
                        if (response.status === "successful") {
                            transferArtwork(); // Trigger transfer logic after payment success
                        }
                        closePaymentModal(); // Close the Flutterwave modal
                        },
                        onClose: () => {
                        console.log("Flutterwave modal closed");
                        },
                    });
                } catch (err) {
                const error = parseErrors(err);
                handleError(error.errors);
                }
            }
        }
    }

    return(
        <Button
            text={ !isSold ? `${Innertext}` : "Sold"}
            textStyles=" w-[144px] lg:w-[183px]"
            className="text-white border-white"
            disabled={!available}
            loading =  {connectionStatus === "disconnected" ? false : !verified }
            action={handleBuy}
        />
    )
}

export default VerifyButton