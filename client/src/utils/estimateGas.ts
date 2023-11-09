import { ethers, Contract, BrowserProvider } from "ethers";
import ABI from "../abis/MintCrossABI.json";
import BigNumber from "bignumber.js"; 

export async function estimateGas(
  _dstChainId: number | undefined,
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
    const [nativeFee, zroFee]  = await contract.estimateSendFee(
      _dstChainId,
      toAddress,
      amount,
      ethers.ZeroAddress,
      adapterParams
    );
    console.log("nativeFee", nativeFee)

    return { nativeFee: new BigNumber(nativeFee), zroFee: new BigNumber(zroFee) };
  } catch (error) {
    throw error;
  }
}
