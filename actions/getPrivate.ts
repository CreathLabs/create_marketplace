"use server"

import { ethers } from "ethers";
import ContractAbi from "@/app/providers/ABI/contractABI.json";
import CreathABI from "@/app/providers/ABI/creathABI.json";
import CollectionContractABI from "@/app/providers/ABI/CollectionContractABI.json";
import { createWalletClient, http, fallback, createPublicClient } from 'viem';
import { optimism } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const PROVIDERS = [
  "https://optimism-rpc.publicnode.com",
  "https://mainnet.optimism.io",
  "https://optimism.drpc.org",
  "https://opt-mainnet.g.alchemy.com/v2/zgCpItc4ibgfD5I_y5X0j4Wdfux5YT3j",
  "https://optimism.public.blockpi.network/v1/rpc/public"
];

class FetchProvider extends ethers.providers.JsonRpcProvider {
  url: string;

  constructor(url: string, network: { name: string; chainId: number }) {
    super(url, network);
    // we won’t use ethers’ URL
    this.url = url;
    // network is set by parent constructor
  }

  async send(method: string, params: Array<any>): Promise<any> {
    const payload = {
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    };

    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.error) throw new Error(json.error.message);
    return json.result;
  }
}

// Choose the first working RPC
async function getWorkingFetchProvider() {
  for (const url of PROVIDERS) {
    try {
      // quick health check
      const testRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
      });
      const data = await testRes.json();
      if (data.result) {
        console.log(`✅ Connected to ${url}`);
        return new FetchProvider(url, { name: "optimism", chainId: 10 });
      }
    } catch (err) {
      console.warn(`❌ RPC failed: ${url}`, (err as Error).message);
    }
  }
  throw new Error("All RPCs failed");
}

// async function getWorkingProvider() {
//   for (const url of PROVIDERS) {
//     try {
//       const provider = new ethers.providers.JsonRpcProvider(url, { name: "optimism", chainId: 10 });
//       await provider.getBlockNumber(); // quick health check
//       console.log(`✅ Connected to ${url}`);
//       return provider;
//     } catch (err) {
//       console.warn(`❌ RPC failed: ${url}`);
//     }
//   }
//   throw new Error("All Optimism RPCs failed");
// }

async function getWallet() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is missing in environment variables");
  }
  const provider = await getWorkingFetchProvider()
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
}


async function getViemWallet() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is missing in environment variables");
  }

  const pk = process.env.PRIVATE_KEY.startsWith("0x")
    ? process.env.PRIVATE_KEY.trim()
    : `0x${process.env.PRIVATE_KEY.trim()}`;
  // Create account from private key
  const account = privateKeyToAccount(pk as `0x${string}`);

  // Create transport with fallback RPCs
  const transport = fallback(PROVIDERS.map(url => http(url)));

  // Create wallet client
  return createWalletClient({
    account,
    chain: optimism,
    transport
  });
}

const publicClient = createPublicClient({
  chain: optimism,
  transport: fallback(PROVIDERS.map(url => http(url)))
});

export async function MintAndList(
  tokenURI: string,
  artistWallet: string,
  floor_price: number
) {
  try {
    const contractAddress = "0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994";
    const creathAddress = "0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6";
    const wallet = await getWallet();

    const MintingContract = new ethers.Contract(contractAddress, ContractAbi, wallet);
    const ListingContract = new ethers.Contract(creathAddress, CreathABI, wallet);

    const mintTx = await MintingContract.mint(wallet.address, tokenURI);
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
    const wallet = await getWallet();

    const MintingContract = new ethers.Contract(exhibition_address, ContractAbi, wallet);
    const ListingContract = new ethers.Contract(creathAddress, CreathABI, wallet);

    const mintTx = await MintingContract.mint(wallet.address, tokenURI);
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

    const walletClient = await getViemWallet();

    // Step 1: Create NFT contract
    const txHash = await walletClient.writeContract({
      address: collectionContractAddress as `0x${string}`,
      abi: CollectionContractABI,
      functionName: 'createNFTContract',
      args: [name, random]
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    // Step 2: Get new contract address from logs
    const collectionAddress = receipt.logs[0].address as `0x${string}`;

    // Step 3: Set approval
    await walletClient.writeContract({
      address: collectionAddress,
      abi: ContractAbi,
      functionName: 'setApprovalForAll',
      args: [creathAddress, true]
    });

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
    const wallet = await getWallet();

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
