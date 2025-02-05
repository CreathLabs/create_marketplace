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
                projectId: "b4e72e2a-e754-4345-903b-cd4aadb01330",
                clientKey: "cw5UfLmflJfryPgX5cbxoeOeQZUpKjG9VrDQvjvu",
                appId: "82310efc-630c-4dfa-b073-984eec0078fe",
                customStyle:{
                    logo: "https://art.creath.io/static/media/creathscg.bf3f0b7dbfa0e5f9464322e6f7f0a3eb.svg",
                    projectName: "Creath Marketplace",
                    subtitle: "Login or Sign Up"
                },
                chains: [optimism, mainnet, solana],
                authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
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