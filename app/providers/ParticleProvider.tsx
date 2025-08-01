"use client";

import { AuthType } from '@particle-network/auth-core';
import { AuthCoreContextProvider } from '@particle-network/authkit';
import { optimism, mainnet, solana } from '@particle-network/authkit/chains';
import { Buffer } from 'buffer';
import { ReactNode } from "react";

if (typeof window !== 'undefined') {
    (window as any).Buffer = (window as any).Buffer || Buffer;
}
  
Buffer.from('anything', 'base64');

interface ParticleProviderProps {
    children: ReactNode;
}

const ParticleProvider = ({ children }: ParticleProviderProps) => {
    return (
        <AuthCoreContextProvider
            options={{
                projectId: "a4c57a32-0d8c-44bb-a89f-d7373caad2ca",
                clientKey: "cBt5RaacYbmwUVriB4SIBV3ZT2VHaNkaRFa93dgi",
                appId: "07ff476a-2ab4-4d0a-910a-73de51597c11",
                customStyle:{
                    logo: "https://art.creath.io/static/media/creathscg.bf3f0b7dbfa0e5f9464322e6f7f0a3eb.svg",
                    projectName: "Creath Marketplace",
                    subtitle: "Login or Sign Up"
                },
                chains: [optimism, mainnet, solana],
                authTypes: [AuthType.email],
                themeType: "light", // Login modal theme
                fiatCoin: "USD",
                language: "en",
                // optional, ERC4337
                // You can prompt the user to set up extra security measure upon login or other interactions
                wallet: {
                    themeType: 'light', // Wallet modal theme
                    visible: true,
                    customStyle: {
                        evmSupportWalletConnect: true,
                        supportAddToken: true
                    }
                }
            }}
        >
        {children}
      </AuthCoreContextProvider>
    );
  };
  
export default ParticleProvider;