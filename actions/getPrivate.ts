"use server";

import { ethers } from "ethers";
import ContractAbi from "@/app/providers/ABI/contractABI.json";
import CreathABI from "@/app/providers/ABI/creathABI.json";
import CollectionContractABI from "@/app/providers/ABI/CollectionContractABI.json";

const PROVIDERS = {
  optimism: "https://optimism-rpc.publicnode.com",
  optimismMainnet: "https://mainnet.optimism.io",
  optimismDRPC: "https://optimism.drpc.org",
};

function getWallet(providerUrl: string) {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is missing in environment variables");
  }
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
}

export async function MintAndList(
  tokenURI: string,
  artistWallet: string,
  floor_price: number
) {
  try {
    const contractAddress = "0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994";
    const creathAddress = "0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6";
    const wallet = getWallet(PROVIDERS.optimism);

    const MintingContract = new ethers.Contract(contractAddress, ContractAbi, wallet);
    const ListingContract = new ethers.Contract(creathAddress, CreathABI, wallet);

    const mintTx = await MintingContract.mint(artistWallet, tokenURI);
    const mintReceipt = await mintTx.wait();
    const nft_id = parseInt(mintReceipt.events[0].args[2]._hex, 16);

    const UnitPrice = ethers.utils.parseUnits(floor_price.toString(), 6);
    const listTx = await ListingContract.listItem(contractAddress, artistWallet, nft_id, UnitPrice);
    await listTx.wait();

    return { nft_id };
  } catch (err) {
    console.error("MintAndList Error:", err);
    throw new Error(`MintAndList failed: ${(err as Error).message}`);
  }
}

export async function MintExhibition(
  tokenURI: string,
  artistWallet: string,
  floor_price: number,
  exhibition_address: string
) {
  try {
    const creathAddress = "0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6";
    const wallet = getWallet(PROVIDERS.optimism);

    const MintingContract = new ethers.Contract(exhibition_address, ContractAbi, wallet);
    const ListingContract = new ethers.Contract(creathAddress, CreathABI, wallet);

    const mintTx = await MintingContract.mint(artistWallet, tokenURI);
    const mintReceipt = await mintTx.wait();
    const nft_id = parseInt(mintReceipt.events[0].args[2]._hex, 16);

    const UnitPrice = ethers.utils.parseUnits(floor_price.toString(), 6);
    const listTx = await ListingContract.listItem(exhibition_address, artistWallet, nft_id, UnitPrice);
    await listTx.wait();

    return { nft_id };
  } catch (err) {
    console.error("MintExhibition Error:", err);
    throw new Error(`MintExhibition failed: ${(err as Error).message}`);
  }
}

export async function createExhibition(name: string, random: string) {
  try {
    const collectionContractAddress = "0x0578b23FE97D6Ac801007D259b03334F57276384";
    const creathAddress = "0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6";
    const wallet = getWallet(PROVIDERS.optimismMainnet);

    const CollectionContractInstance = new ethers.Contract(
      collectionContractAddress,
      CollectionContractABI,
      wallet
    );

    const tx = await CollectionContractInstance.createNFTContract(name, random);
    const receipt = await tx.wait();

    const collectionAddress = receipt.events[0].address;
    const collectionInstance = new ethers.Contract(collectionAddress, ContractAbi, wallet);

    await collectionInstance.setApprovalForAll(creathAddress, true);

    return { address: collectionAddress };
  } catch (err) {
    console.error("createExhibition Error:", err);
    throw new Error(`createExhibition failed: ${(err as Error).message}`);
  }
}

export async function transferArtwork(
  exhibition_address: string | null,
  wallet_address: string,
  nft_id: string
) {
  try {
    const creathAddress = "0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6";
    const wallet = getWallet(PROVIDERS.optimismDRPC);

    const transferAddress = exhibition_address || creathAddress;
    const transferContract = new ethers.Contract(transferAddress, CreathABI, wallet);

    const id = ethers.BigNumber.from(nft_id);
    await transferContract.buyItem(creathAddress, wallet_address, id, true);

    return { done: true };
  } catch (err) {
    console.error("transferArtwork Error:", err);
    throw new Error(`transferArtwork failed: ${(err as Error).message}`);
  }
}
