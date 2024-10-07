import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";


const page = ()=>{

    return(
        <div className="py-14 w-full contain space-y-8 lg:space-y-[72px]">
            <div className="flex flex-col md:w-[50%] lg:w-[60%] w-full lg:flex-column gap-y-6 lg:gap-0 justify-between lg:items-start ">
                <h1 className=" heading leading-[60px] ">How Do I Convert from One Coin to another on MetaMask</h1>
                <div className="flex flex-row lg:w-[30%] md:w-[30%] w-[50%] mt-8 items-start justify-between">
                    <Icon
                        icon="ant-design:instagram-filled"
                        className="text-black text-2xl lg:text-[26px]"
                    />
                    <Icon
                        icon="ant-design:twitter-outlined"
                        className="text-black text-2xl lg:text-[26px]"
                    />
                    <Icon
                        icon="dashicons:linkedin"
                        className="text-black text-2xl lg:text-[26px]"
                    />
                </div>
            </div>
            <div className="lg:px-14 flex flex-col gap-y-8 lg:items-start ">
                <Image
                    src="/blog_sample.png"
                    fill
                    alt="Image"
                    className=" !h-[200px] !w-[100%] !relative object-cover "
                />
                 <div className="px-7">
                    <ul className="list-disc">
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base  ">Depending on your region, you may be able to buy ETH directly with a credit or debit card via a third party provider. Please note, buying crypto with a credit card may incur additional fees, depending on which third-party provider you use. You may also not receive the entire crypto amount immediately</li>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base  ">Open the MetaMask wallet extension or the mobile app.</li>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base  ">Press Buy ETH.</li>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base  ">Select a third-party service such as Wyre, Transak or MoonPay, which will facilitate the transfer of funds from your chosen funding source.</li>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base  ">Follow the steps provided by the third-party service. You may need to submit personal information like an ID card or proof of residence to meet KYC (Know Your Customer) requirements</li>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base ">Once you’re finished purchasing, the funds should appear in your wallet.</li>
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default page