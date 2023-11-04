import { create } from "zustand";

// import ABI from "../abis/MintCrossABI.json";

interface Store {
  mintCrossAddress: `0x${string}` | undefined;
  balance: number | undefined;
  setAddress: (chainId: number | undefined) => void;
  bridge: () => void;
}

export const useMintCrossStore = create<Store>()((set, get) => ({
  //State
  mintCrossAddress: undefined,
  balance: undefined,

  // actions
  setAddress: (chainId: number | undefined) => {
    try {
      if (chainId === Number(11155111)) {
        // Sepolia
        set({
          mintCrossAddress: "0x14AD9eC1177Ea8963F9dd4f317884d3cdd984310",
        });
      } else if (chainId === Number(80001)) {
        // Mumbai
        set({
          mintCrossAddress: "0x4890aFC8c305B6023feCe93b60C77B222733037d",
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  
  bridge: () => {},
}));
