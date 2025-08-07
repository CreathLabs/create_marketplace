"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useEthereum, useConnect } from "@particle-network/authkit";
import { ChainType, WidgetConfig } from "@lifi/widget";
import { ethers } from "ethers";

// Bridge/Swap Icon Component
const BridgeIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        <path
            d="M7 16L3 12M3 12L7 8M3 12H13M17 8L21 12M21 12L17 16M21 12H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const LiFiWidget = dynamic(
    async () => (await import("@lifi/widget")).LiFiWidget,
    { ssr: false }
);

const BridgeButton = () => {
    const { provider, chainId } = useEthereum();
    const { connected } = useConnect();
    const [showBridge, setShowBridge] = useState(false);
    const [address, setAddress] = useState("");
    const lifiAddress = {
        name: "User Address",
        address: address,
        chainType: ChainType.EVM
    }

    useEffect(() => {
        const getInfo = async () => {
            try {
                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const accounts = await ethersProvider.listAccounts();
                setAddress(accounts[0])
            }
            catch (error) {
                console.log(error)
            }
        }

        getInfo();
    }, [connected])

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && showBridge) {
                setShowBridge(false);
            }
        };

        if (showBridge) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [showBridge])

    const widgetConfig: WidgetConfig = {
        integrator: "creath-marketplace",
        fromChain: chainId ?? 1,       // fallback to Ethereum if unknown
        toChain: 10,                   // Optimism
        toAddress: lifiAddress,
        theme: {
            palette: {
                primary: { main: '#3B82F6' },
                secondary: { main: '#6B7280' }
            }
        },
        // Optional:
        // fromToken: "ETH", // let widget auto-detect user's token
        // toToken: "OP",
    }
    if (!connected) {
        return null; // Keep existing connected-only restriction
    }

    return (
        <>
            {/* Floating Circular Button */}
            <button
                onClick={() => setShowBridge(true)}
                className="fixed bottom-20 right-4 md:bottom-24 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center z-50 focus:outline-none focus:ring-4 focus:ring-gray-300"
                aria-label="Open Bridge"
                title="Bridge tokens across chains"
            >
                <BridgeIcon />
            </button>

            {/* Modal */}
            {showBridge && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99] p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowBridge(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl md:max-w-lg">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Bridge Tokens</h2>
                            <button
                                onClick={() => setShowBridge(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 md:p-6">
                            <LiFiWidget integrator="creath-marketplace" config={widgetConfig} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BridgeButton;