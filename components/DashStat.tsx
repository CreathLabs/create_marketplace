"use client"
import { useAuthCore } from '@particle-network/authkit';
import { Icon } from "@iconify/react/dist/iconify.js";



const DashStat = ({ title, value }: { title: string; value: string }) => {
    const { openWallet } = useAuthCore();

    const toggleParticleWallet = async () => {
      openWallet({
          windowSize: 'small',
          topMenuType: 'close',
      });
    };
  
    return (
      <div className="flex justify-between items-center ">
        <div className="space-y-4">
          <h2 className="font-bold text-base ">{title}</h2>
          <h1 className="font-Playfair text-[26px] font-bold ">{value}</h1>
        </div>
        <div className="flex gap-x-12 items-center" onClick={toggleParticleWallet}>
          <div className="space-y-6 flex flex-col items-center ">
            <Icon icon="dashicons:arrow-down-alt2" className="!text-2xl" />
            <h1 className="font-sm font-semibold ">Receive</h1>
          </div>
          <div className="space-y-6 flex flex-col items-center " onClick={toggleParticleWallet}>
            <Icon icon="dashicons:arrow-up-alt2" className="!text-2xl" />
            <h1 className="font-sm font-semibold ">Send</h1>
          </div>
        </div>
      </div>
    );
};


export default DashStat