import { create } from "zustand";
import { ADDRESSES } from "../consts/addresses";
import BigNumber from "bignumber.js";
import ABI from "../abis/MintCrossABI.json";
import { ethers } from "ethers";
import { LZ_CHAINIDS } from "../consts/lzChainIds";

interface Store {
  mintCrossAddress: `0x${string}` | undefined;
  balance: number | undefined;
  setAddress: (chainId: number | undefined) => void;
  estimateFee: (
    s_dstChainId: number,
    mintCrossAddr: `0x${string}` | undefined,
    toAddress: `0x${string}` | undefined,
    amount: number
  ) => Promise<{ nativeFee: BigNumber; zroFee: BigNumber }>;
}

export const useMintCrossStore = create<Store>()((set) => ({
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

  estimateFee: async (
    s_dstChainId: number,
    mintCrossAddr: `0x${string}` | undefined,
    toAddress: `0x${string}` | undefined,
    amount: number
  ): Promise<{ nativeFee: BigNumber; zroFee: BigNumber }> => {
    try {
      let provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider("");
      if (!mintCrossAddr || !toAddress) {
        throw new Error("mintCrossAddr and toAddress must be defined");
      }

      if (s_dstChainId === LZ_CHAINIDS.sepolia) {
        provider = new ethers.JsonRpcProvider(
          "https://eth-sepolia.g.alchemy.com/v2/ckN344g49RcvfHyjzwu3QUPKl71HDLnk"
        );
      } else if (s_dstChainId === LZ_CHAINIDS.mumbai) {
        provider = new ethers.JsonRpcProvider(
          "https://polygon-mumbai.g.alchemy.com/v2/ej9WsLVzFGZQMCg7v7hU-CFxawWz13uo"
        );
      }
      const contract = new ethers.Contract(
        mintCrossAddr as string,
        ABI.abi,
        provider
      );

      let adapterParams = ethers.solidityPacked(
        ['uint16','uint256'],
        [1, 200000]
    )

      const { nativeFee, zroFee } = await contract.estimateFee(
        toAddress,
        amount,
        adapterParams
      );

      return {
        nativeFee: new BigNumber(Number(nativeFee)),
        zroFee: new BigNumber(Number(zroFee)),
      };
    } catch (error) {
      throw error;
    }
  },
}));
