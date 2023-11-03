import { polygonMumbai, sepolia } from '@wagmi/core/chains'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
});