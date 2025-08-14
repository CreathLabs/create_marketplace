"use client";
import { useEffect, useState } from "react";
import { useConnect, useEthereum } from "@particle-network/authkit";
import { ethers } from "ethers";
import Image from "next/image";

const GetNft = () => {
    const { connected } = useConnect();
    const [nfts, setNfts] = useState([]);
    const [modal, setModal] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [transferModal, setTransferModal] = useState(false);
    const [selectedNft, setSelectedNft] = useState(null);
    const [transferAddress, setTransferAddress] = useState("");
    const [transferLoading, setTransferLoading] = useState(false);
    const [transferHash, setTransferHash] = useState("");
    const [signer, setSigner] = useState(null);
    const [toAddress, setToAddress] = useState("");
    const { provider } = useEthereum();

    useEffect(() => {
        const getNft = async () => {
            try {
                setLoading(true);
                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const accounts = await ethersProvider.listAccounts();
                const userAddress = accounts[0];
                setAddress(userAddress);
                const signer = ethersProvider.getSigner(accounts[0]);
                setSigner(signer);
                // Fetch NFTs from Alchemy API
                const response = await fetch(`https://opt-mainnet.g.alchemy.com/v2/zgCpItc4ibgfD5I_y5X0j4Wdfux5YT3j/getNFTs?owner=${userAddress}`);
                const data = await response.json();

                if (data.ownedNfts) {
                    setNfts(data.ownedNfts);
                } else {
                    setNfts([]);
                }
            } catch (error) {
                console.error("Error getting NFTs:", error);
                setNfts([]);
            } finally {
                setLoading(false);
            }
        };

        if (connected) {
            setShowButton(true);
            getNft();
        } else {
            setModal(false);
            setShowButton(false);
            setAddress("");
        }
    }, [connected, provider]);

    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleOpenTransferModal = (nft) => {
        setSelectedNft(nft);
        setTransferModal(true);
        setTransferHash("");
        setTransferAddress("");
    };

    const handleCloseTransferModal = () => {
        setTransferModal(false);
        setSelectedNft(null);
        setTransferAddress("");
        setTransferHash("");
        setTransferLoading(false);
    };

    const transferNft = async () => {
        if (!selectedNft || !transferAddress) return;

        try {
            setTransferLoading(true);
            setTransferHash("");

            const abi = [
                "function safeTransferFrom(address from, address to, uint256 tokenId) external",
            ];
            
            // Create contract instance for the NFT
            const nftContract = new ethers.Contract(
                selectedNft.contract.address,
                abi,
                signer
            );

            // Convert hex token ID to decimal
            const tokenId = parseInt(selectedNft.id.tokenId, 16);
            
            // Transfer the NFT
            const tx = await nftContract.safeTransferFrom(address, transferAddress, tokenId);
            
            // Wait for transaction confirmation
            const receipt = await tx.wait();
            
            setTransferHash(receipt.transactionHash);
            
            // Refresh NFTs after successful transfer
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error("Transfer failed:", error);
            setTransferHash("Transfer failed: " + (error.message || "Unknown error"));
        } finally {
            setTransferLoading(false);
        }
    };

    // const transferNft = async (contractAddress, tokenId) => {
    //     try {
    //     const abi = [
    //         "function safeTransferFrom(address from, address to, uint256 tokenId) external",
    //     ];
    //     const contract = new ethers.Contract(contractAddr, abi, signer);
    
    //     const tx = await contract.safeTransferFrom(
    //         await signer.getAddress(),
    //         toAddress,
    //         tokenId
    //     );
    //     await tx.wait();
    //     alert(`NFT transferred! TX hash: ${tx.hash}`);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Transfer failed: " + err.message);
    //     }
    // };

    return (
        <div>
            {/* Button - only shows when connected */}
            {showButton && (
                <button
                    onClick={handleOpenModal}
                    className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 transition-colors duration-200"
                >
                    View NFTs
                </button>
            )}

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Your NFTs</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Connected Address:</p>
                                <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">{address}</p>
                            </div>

                            {/* NFT Content */}
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                                    <p className="text-gray-500">Loading your NFTs...</p>
                                </div>
                            ) : nfts.length > 0 ? (
                                <div>
                                    <p className="text-sm text-gray-600 mb-4">Found {nfts.length} NFT(s)</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                                        {nfts.map((nft, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                                                {nft.media && nft.media[0] && (
                                                    <Image
                                                        src={nft.media[0].gateway || nft.media[0].raw}
                                                        alt={nft.title || `NFT ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded mb-2"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                )}
                                                <h3 className="font-semibold text-sm truncate">
                                                    {nft.title || `NFT #${parseInt(nft.id.tokenId, 16)}`}
                                                </h3>
                                                <p className="text-xs text-gray-500 truncate">
                                                    Contract Addess: {nft.contract?.address || 'Unknown Collection'}
                                                </p>
                                                <p className="text-xs text-gray-400 mb-2">
                                                    Token ID: {parseInt(nft.id.tokenId, 16)}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenTransferModal(nft);
                                                    }}
                                                    className="w-full bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 transition-colors duration-200"
                                                >
                                                    Transfer NFT
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No NFTs found in your wallet</p>
                                    <p className="text-sm text-gray-400 mt-2">Make sure you&apos;re connected to the Optimism network</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Transfer Modal */}
            {transferModal && selectedNft && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
                    <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                        {/* Transfer Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Transfer NFT</h2>
                            <button
                                onClick={handleCloseTransferModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                aria-label="Close transfer modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Transfer Modal Content */}
                        <div className="p-6">
                            {/* NFT Info */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-sm mb-1">
                                    {selectedNft.title || `NFT #${parseInt(selectedNft.id.tokenId, 16)}`}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {selectedNft.contract?.name || 'Unknown Collection'}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Token ID: {parseInt(selectedNft.id.tokenId, 16)}
                                </p>
                            </div>

                            {/* Transfer Address Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipient Address
                                </label>
                                <input
                                    type="text"
                                    value={transferAddress}
                                    onChange={(e) => setTransferAddress(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    disabled={transferLoading}
                                />
                            </div>

                            {/* Transaction Hash Display */}
                            {transferHash && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                        {transferHash.startsWith("Transfer failed") ? "Error:" : "Transaction Hash:"}
                                    </p>
                                    <p className={`text-xs font-mono break-all ${
                                        transferHash.startsWith("Transfer failed") ? "text-red-600" : "text-green-600"
                                    }`}>
                                        {transferHash}
                                    </p>
                                    {!transferHash.startsWith("Transfer failed") && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            Page will refresh in 3 seconds...
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Transfer Button */}
                            <button
                                onClick={transferNft}
                                disabled={!transferAddress || transferLoading || transferHash.length > 0}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-2 px-4 transition-colors duration-200 flex items-center justify-center"
                            >
                                {transferLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Transferring...
                                    </>
                                ) : (
                                    "Transfer NFT"
                                )}
                            </button>

                            {/* Warning */}
                            <p className="text-xs text-gray-500 mt-3 text-center">
                                ⚠️ This action cannot be undone. Make sure the recipient address is correct.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetNft;