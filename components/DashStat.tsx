"use client";
import { useEffect, useState } from "react";
import {
  useAuthCore,
  useEthereum,
  useConnect,
} from "@particle-network/authkit";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ethers } from "ethers";

const fetchETHUSDPrice = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    return data.ethereum.usd;
  } catch (err) {
    return null;
  }
};

const getAccountBalanceInUSD = async (
  address: string,
  ethersProvider: ethers.providers.Web3Provider
) => {
  const balanceInWei = await ethersProvider.getBalance(address);
  const balanceInEther = parseFloat(ethers.utils.formatEther(balanceInWei));

  // Fetch current ETH to USD rate
  const ethUSDPrice = await fetchETHUSDPrice();

  // Convert balance to USD
  const balanceInUSD = balanceInEther * ethUSDPrice;
  return { usd: balanceInUSD, eth: balanceInEther };
};

const DashStat = ({ title, value }: { title: string; value: string }) => {
  const { openWallet } = useAuthCore();
  const { connected } = useConnect();
  const { provider } = useEthereum();
  const [balance, setBalance] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const initializeProvider = async (provider: any) => {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const accounts = await ethersProvider.listAccounts();

    const balanceInEther = await ethersProvider.getBalance(accounts[0]);
    setEthBalance(ethers.utils.formatEther(balanceInEther)); // Ether balance

    // Get balance in USD
    const usdBalance = await getAccountBalanceInUSD(
      accounts[0],
      ethersProvider
    );
    setBalance(usdBalance?.usd.toFixed(2)); // Balance in USD
  };

  useEffect(() => {
    if (value === "Balance") {
      initializeProvider(provider);
    } else {
      setBalance("0000000000");
    }
  }, [connected]);

  const toggleParticleWallet = async () => {
    openWallet({
      windowSize: "small",
      topMenuType: "close",
    });
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="space-y-4">
        <h2 className="font-bold text-base ">{title}</h2>
        <h1 className="font-Playfair text-[22px] lg:text-[26px] font-bold ">
          {balance ? `$ ${balance}` : `ETH ${ethBalance}`}
        </h1>
      </div>
      <div
        className="flex gap-x-8 lg:gap-x-12 items-center"
        onClick={toggleParticleWallet}
      >
        <div className=" space-y-4 lg:space-y-6 flex flex-col items-center ">
          <Icon
            icon="dashicons:arrow-down-alt2"
            className=" !text-xl lg:!text-2xl"
          />
          <h1 className="font-sm font-semibold ">Receive</h1>
        </div>
        <div
          className=" space-y-4 lg:space-y-6 flex flex-col items-center "
          onClick={toggleParticleWallet}
        >
          <Icon
            icon="dashicons:arrow-up-alt2"
            className=" !text-xl lg:!text-2xl"
          />
          <h1 className="font-sm font-semibold ">Send</h1>
        </div>
      </div>
    </div>
  );
};

export default DashStat;
