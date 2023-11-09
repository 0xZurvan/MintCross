import { create } from "zustand";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CHAIN_IDS } from "../consts/chainIds";
import { CHAINS } from "../consts/chains";

interface Chain {
  name: string;
  path: string;
}
interface Store {
  currentChainId: number | undefined;
  connectedNetwork: Chain | undefined;
  fromChain: Chain | undefined;
  toChain: Chain | undefined;
  isNetworkModalOpen: boolean;
  toggleNetworkModal: (bool: boolean) => void;
  switchNetwork: (_chainId: number) => Promise<void>;
  setChains: (chainId: number | undefined) => void;
  setCurrentNetwork: (chainId: number | undefined) => void;
}

export const connector = new MetaMaskConnector();

export const useNetworkStore = create<Store>()((set, get) => ({
  //State:
  currentChainId: undefined,
  connectedNetwork: undefined,
  fromChain: undefined,
  toChain: undefined,
  isNetworkModalOpen: false,

  // Actions:
  switchNetwork: async (chainId: number) => {
    try {
      await connector.switchChain(chainId);
      set({
        currentChainId: chainId,
      });
      get().toggleNetworkModal(false);
    } catch (error) {
      console.error(error);
    }
  },

  toggleNetworkModal: (bool: boolean) => {
    set({
      isNetworkModalOpen: bool,
    });
  },

  setChains: (chainId: number | undefined) => {
    if(chainId === Number(CHAIN_IDS.sepolia)) {
      set({
        fromChain: CHAINS.sepolia,
        toChain: CHAINS.mumbai
      });
    } else if(chainId === Number(CHAIN_IDS.mumbai)) {
      set({
        fromChain: CHAINS.mumbai,
        toChain: CHAINS.sepolia
      });
    }
  },

  setCurrentNetwork: (chainId: number | undefined) => {
    if(chainId === Number(CHAIN_IDS.sepolia)) {
      set({
        connectedNetwork: CHAINS.sepolia
      })
    } else if(chainId === Number(CHAIN_IDS.mumbai)) {
      set({
        connectedNetwork: CHAINS.mumbai
      })
    }
  }

}));
