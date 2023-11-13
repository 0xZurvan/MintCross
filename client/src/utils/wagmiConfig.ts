import { polygonMumbai, sepolia } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [
    publicProvider(),
    alchemyProvider({ apiKey: "ej9WsLVzFGZQMCg7v7hU-CFxawWz13uo" }),
    alchemyProvider({ apiKey: "ckN344g49RcvfHyjzwu3QUPKl71HDLnk" }),
  ]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
