import { create } from "zustand";
import { ADDRESSES } from "../consts/addresses";

// import ABI from "../abis/MintCrossABI.json";

interface Store {
  mintCrossAddress: `0x${string}` | undefined;
  balance: number | undefined;
  setAddress: (chainId: number | undefined) => void;
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
          mintCrossAddress: ADDRESSES.sepolia as `0x${string}`,
        });
      } else if (chainId === Number(80001)) {
        // Mumbai
        set({
          mintCrossAddress: ADDRESSES.mumbai as `0x${string}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  
}));
