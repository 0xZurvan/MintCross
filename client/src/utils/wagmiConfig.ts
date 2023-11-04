import { polygonMumbai, sepolia } from 'wagmi/chains'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [publicProvider()],
)

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
});