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
import { useShallow } from "zustand/react/shallow";
import ABI from "../abis/MintCrossABI.json";
import { useState } from "react";

export default function Mint() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [toggleNetworkModal, connectedNetwork] = useNetworkStore(
    useShallow((state) => [state.toggleNetworkModal, state.connectedNetwork])
  );
  const [mintCrossAddress] = useMintCrossStore(
    useShallow((state) => [state.mintCrossAddress])
  );

  const [amount, setAmount] = useState<number>(0);

  const { config } = usePrepareContractWrite({
    address: mintCrossAddress,
    abi: ABI.abi,
    functionName: "buy",
    args: [amount * 1e18],
    chainId: chain?.id,
  });

  const { isLoading, isSuccess, isError, write } = useContractWrite(config);

  const openModal = () => {
    toggleNetworkModal(true);
  };

  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-3xl font-ibm font-bold text-center">
        Step 1: Mint OFT
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
      </div>

      <TransactionModal
        text="Minting"
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="flex flex-col w-full">
          <p className="text-white text-lg font-ibm font-medium">AMOUNT:</p>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className=" bg-gray-dark border-2 border-gray-medium rounded-lg p-2 text-white"
          />
        </div>
        {isConnected ? (
          <Button
            title="MINT"
            className="w-full text-xl"
            onClick={() => write?.()}
          />
        ) : (
          <ConnectWallet className="w-full" />
        )}
      </div>
    </div>
  );
}
