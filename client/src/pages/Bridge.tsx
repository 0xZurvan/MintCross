import Button from "../components/common/Button";
import TransactionModal from "../components/common/TransactionModal";
import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import ConnectWallet from "../components/common/ConnectWallet";
import { useNetworkStore } from "../stores/useNetworkStore";
import { useMintCrossStore } from "../stores/useMintCrossStore";
import ABI from "../abis/MintCrossABI.json";
import { useShallow } from "zustand/react/shallow";
import { useState, useEffect } from "react";
import { ethers, BigNumberish } from "ethers";
// import { ADDRESSES } from "../consts/addresses";
import { LZ_CHAINIDS } from "../consts/lzChainIds";
import { CHAIN_IDS } from "../consts/chainIds";
import { estimateGas } from "../utils/estimateGas";
import { BigNumber } from "bignumber.js";


export default function Bridge() {
  const [lzChainId, setLzChainId] = useState<number | undefined>(undefined);
  const [nativeFee, setNativeFee] = useState<BigNumber>();
  const [amount, setAmount] = useState<number>(0);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [toggleNetworkModal, connectedNetwork, fromChain, toChain] =
    useNetworkStore(
      useShallow((state) => [
        state.toggleNetworkModal,
        state.connectedNetwork,
        state.fromChain,
        state.toChain,  
      ])
    );
  const [mintCrossAddress] = useMintCrossStore(
    useShallow((state) => [state.mintCrossAddress])
  );

  useEffect(() => {
    const _setLzChainId = () => {
      if (chain?.id === Number(CHAIN_IDS.sepolia)) {
        setLzChainId(Number(LZ_CHAINIDS.sepolia));
      } else if (chain?.id === Number(CHAIN_IDS.mumbai)) {
        setLzChainId(Number(LZ_CHAINIDS.mumbai));
      }
    };
    console.log('nativeFee', nativeFee)
    _setLzChainId();
  }, [chain, isConnected]);

  useEffect(() => {
    const _estimateGas = async () => {
      const data = await estimateGas(
        lzChainId,
        mintCrossAddress,
        address,
        amount * 1e18
      );

      setNativeFee(data.nativeFee)
    };
    console.log('nativeFee2', nativeFee)
    _estimateGas();
  }, [amount, isConnected]);

  let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000]);
  let  NATIVE_FEE = nativeFee ? nativeFee.mul(5).div(4) : undefined;
  let NATIVE_FEE_BIGINT: bigint | undefined = NATIVE_FEE ? BigInt(NATIVE_FEE.toString()) : undefined;

  const { config } = usePrepareContractWrite({
    address: mintCrossAddress,
    abi: ABI.abi,
    functionName: "bridge",
    args: [amount * 1e18, adapterParams],
    chainId: chain?.id,
    value: NATIVE_FEE_BIGINT
  });

  // Uncomment only to set the trusted remote addresses

  /*  let trustedRemote = ethers.solidityPacked(
    ["address", "address"],
    // Remote: Mumbai, Local: Sepolia
    [
      ADDRESSES.mumbai,
      ADDRESSES.sepolia,
    ]
  );

  const { config } = usePrepareContractWrite({
    address: mintCrossAddress,
    abi: ABI.abi,
    functionName: "setTrustedRemote",
    args: [LZ_CHAINIDS.mumbai, trustedRemote],
    chainId: chain?.id
  }); */

  const { isLoading, isSuccess, isError, write } = useContractWrite(config);

  const openModal = () => {
    toggleNetworkModal(true);
  };

  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-3xl font-ibm font-bold text-center">
        Step 2: Bridge OFT
      </h1>

      <div className="flex flex-col space-y-4 w-full">
        <h2 className="text-white text-lg font-ibm font-medium">
          SELECT CHAIN:
        </h2>
        <button
          onClick={openModal}
          className="w-full flex flex-row justify-start items-center gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg"
        >
          <img className="w-8 h-8" src={connectedNetwork?.path} alt="" />
          <p className="flex flex-col">
            <span className="font-ibm font-light text-xl">NETWORK</span>
            <span>{connectedNetwork?.name}</span>
          </p>
        </button>

        <h2 className="text-white text-lg font-ibm font-medium">BRIDGE:</h2>
        <button
          onClick={openModal}
          className="w-full flex flex-row justify-start items-center gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg"
        >
          <img className="w-8 h-8" src={fromChain?.path} alt="" />
          <p className="flex flex-col">
            <span className="font-ibm font-light text-xl">FROM:</span>
            <span>{fromChain?.name}</span>
          </p>
        </button>

        <div className="w-full flex flex-row justify-start items-center gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg">
          <img className="w-8 h-8" src={toChain?.path} alt="" />
          <p className="flex flex-col">
            <span className="font-ibm font-light text-xl">TO:</span>
            <span>{toChain?.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="flex flex-col w-full">
          <p className="text-white text-lg font-ibm font-medium">AMOUNT:</p>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className=" bg-gray-dark border-2 border-gray-medium rounded-lg p-2 text-white"
            type="number"
          />
        </div>
        {isConnected ? (
          <Button
            title="BRIDGE"
            className="w-full text-xl"
            onClick={() => write?.()}
          />
        ) : (
          <ConnectWallet className="w-full" />
        )}

        <TransactionModal
          text="Bridging"
          isSuccess={isSuccess}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
