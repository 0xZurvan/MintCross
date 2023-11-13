import { ethers, Contract, BrowserProvider } from "ethers";
import ABI from "../abis/MintCrossABI.json";
import BigNumber from "bignumber.js"; 

export async function estimateGas(
  mintCrossAddr: `0x${string}` | undefined,
  toAddress: `0x${string}` | undefined,
  amount: number
): Promise<{ nativeFee: BigNumber; zroFee: BigNumber }> {
  try {
    let adapterParams = ethers.solidityPacked(
      ["uint16", "uint256"],
      [1, 200000]
    );
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(mintCrossAddr as string, ABI.abi, provider);
    const { nativeFee, zroFee } = await contract.estimateFee(
      toAddress,
      amount,
      adapterParams
    );
    console.log("nativeFee1", nativeFee)

    return { nativeFee: new BigNumber(Number(nativeFee)), zroFee: new BigNumber(Number(zroFee)) };
  } catch (error) {
    throw error;
  }
}
