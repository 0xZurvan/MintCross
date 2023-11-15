import Button from "../components/common/Button";
import TransactionModal from "../components/common/TransactionModal";
import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { parseEther } from "viem";
import ConnectWallet from "../components/common/ConnectWallet";
import { useNetworkStore } from "../stores/useNetworkStore";
import { useMintCrossStore } from "../stores/useMintCrossStore";
import ABI from "../abis/MintCrossABI.json";
import { useShallow } from "zustand/react/shallow";
import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { ADDRESSES } from "../consts/addresses";
import { LZ_CHAINIDS } from "../consts/lzChainIds";
import { CHAIN_IDS } from "../consts/chainIds";
import { BigNumber } from "bignumber.js";

export default function Bridge() {
  const [toAddress, setToAddress] = useState<string>("");
  const [nativeFee, setNativeFee] = useState<BigNumber | string>("");
  const [amount, setAmount] = useState<number>(0);
  const [lzChain, setLzChain] = useState<number>(0);
  const { isConnected } = useAccount();
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
  const [mintCrossAddress, estimateFee] = useMintCrossStore(
    useShallow((state) => [state.mintCrossAddress, state.estimateFee])
  );

  useEffect(() => {
    if(chain?.id === CHAIN_IDS.sepolia) {
      setLzChain(LZ_CHAINIDS.sepolia)
    } else if(chain?.id === CHAIN_IDS.mumbai) {
      setLzChain(LZ_CHAINIDS.mumbai)
    }
  }, [isConnected, chain])
  
  useEffect(() => {
    const _estimateFee = async () => {
      try {
        const data = await estimateFee(
          lzChain,
          mintCrossAddress,
          toAddress as `0x${string}`,
          amount
        );
  
        setNativeFee(String(Number(data.nativeFee) / 1e18));
      } catch (error) {
        console.error(error)
      }
    };

    _estimateFee();

  }, [isConnected, amount, toAddress]);

  const { config } = usePrepareContractWrite({
    address: mintCrossAddress,
    abi: ABI.abi,
    functionName: "bridge",
    args: [toAddress, (amount * 1e18), ""],
    chainId: chain?.id,
    value: parseEther(nativeFee.toString(), "wei"),
  });

  // Uncomment only to set the trusted remote addresses

  /* let trustedRemote = ethers.solidityPacked(
    ["address", "address"],
    // Remote: Sepolia, Local: Mumbai
    [
      ADDRESSES.sepolia,
      ADDRESSES.mumbai,
    ]
  );

  const { config } = usePrepareContractWrite({
    address: mintCrossAddress,
    abi: ABI.abi,
    functionName: "setTrustedRemote",
    args: [LZ_CHAINIDS.sepolia, trustedRemote],
    chainId: chain?.id
  }); */

  const { isLoading, isSuccess, isError, write } = useContractWrite(config);

  const openModal = () => {
    toggleNetworkModal(true);
  };

  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-xl lg:text-3xl font-ibm font-bold text-center">
        Step 2: Bridge OFT
      </h1>

      <div className="flex flex-col space-y-4 w-full">
        <h2 className="text-white text-base lg:text-xl font-ibm font-medium">
          SELECT CHAIN:
        </h2>
        <button
          onClick={openModal}
          className="w-full flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg"
        >
          <img className="w-8 h-8" src={connectedNetwork?.path} alt="" />
          <p className="flex flex-col items-center lg:items-start text-center">
            <span className="font-ibm font-light text-base lg:text-xl">
              NETWORK
            </span>
            <span className="font-ibm font-bold text-base lg:text-xl">
              {connectedNetwork?.name}
            </span>
          </p>
        </button>

        <h2 className="text-white font-ibm font-medium text-base lg:text-xl">
          BRIDGE:
        </h2>
        <button
          onClick={openModal}
          className="w-full flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg"
        >
          <img className="w-8 h-8" src={fromChain?.path} alt="" />
          <p className="flex flex-col items-center lg:items-start text-center">
            <span className="font-ibm font-light text-base lg:text-xl">FROM:</span>
            <span className="font-ibm font-bold text-base lg:text-xl">{fromChain?.name}</span>
          </p>
        </button>

        <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-start items-center  gap-8 bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg">
          <img className="w-8 h-8" src={toChain?.path} alt="" />
          <p className="flex flex-col items-center lg:items-start text-center">
            <span className="font-ibm font-light text-base lg:text-xl">TO:</span>
            <span className="font-ibm font-bold text-base lg:text-xl">{toChain?.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full">
        {/* AMOUNT */}
        <div className="flex flex-col w-full">
          <label className="text-white font-ibm font-medium text-base lg:text-xl">
            AMOUNT:
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className=" bg-gray-dark border-2 border-gray-medium rounded-lg p-2 text-white"
          />
        </div>
        {/* TO ADDRESS */}
        <div className="flex flex-col w-full">
          <label className="text-white text-base lg:text-xl font-ibm font-medium">
            TO ADDRESS :
          </label>
          <input
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            type="text"
            className=" bg-gray-dark border-2 border-gray-medium rounded-lg p-2 text-white"
          />
        </div>
        {isConnected ? (
          <Button
            title="BRIDGE"
            className="w-full text-lg lg:text-xl"
            onClick={() => write?.()}
          />
        ) : (
          <ConnectWallet className="w-full text-lg lg:text-xl" />
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
