import { create } from "zustand";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

interface Store {
  currentChainId: number | undefined;
  isModalOpen: boolean;
  toggleModal: (bool: boolean) => void;
  switchNetwork: (_chainId: number) => Promise<void>;
}

export const connector = new MetaMaskConnector();

export const useNetworkStore = create<Store>()((set, get) => ({
  //State:
  currentChainId: undefined,
  isModalOpen: false,

  // Actions:
  switchNetwork: async (chainId: number) => {
    try {
      await connector.switchChain(chainId);
      set({
        currentChainId: chainId,
      });
      get().toggleModal(false);
    } catch (error) {
      console.error(error);
    }
  },

  toggleModal: (bool: boolean) => {
    set({
      isModalOpen: bool,
    });
  },
}));
