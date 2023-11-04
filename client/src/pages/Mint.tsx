import Button from "../components/Button";
import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import { useNetworkStore } from "../stores/useNetworkStore";
import { useMintCrossStore } from "../stores/useMintCrossStore";
import { useShallow } from "zustand/react/shallow";
import polygon from "../assets/polygon.svg";
import ABI from "../abis/MintCrossABI.json";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FiXCircle } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react";

interface MintModalProps {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

function MintModal({ isSuccess, isLoading, isError }: MintModalProps) {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      setIsMintModalOpen(true);

      // Set a timeout to hide the modal after a short period (e.g., 2 seconds).
      if (isSuccess || isError) {
        const timeoutId = setTimeout(() => {
          setIsMintModalOpen(false);
        }, 2000);

        // Clear the timeout when the component unmounts to prevent memory leaks.
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      {isMintModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" />
          <div className="w-[min(30vw)] p-6 bg-gray-dark rounded-lg relative z-50">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  Minting
                </h2>
                <BeatLoader color="#ff7ac6" loading={isLoading} />
              </div>
            ) : isSuccess ? (
              <div className="flex flex-row-reverse justify-center gap-2 items-center">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  Successful mint!
                </h2>
                <IoIosCheckmarkCircle className="text-purple w-6 h-6" />
              </div>
            ) : isError ? (
              <div className="flex flex-row-reverse justify-center gap-2 items-center">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  Ups! Something went wrong
                </h2>
                <FiXCircle className="text-purple w-6 h-6" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function Mint() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [toggleModal] = useNetworkStore(
    useShallow((state) => [state.toggleModal])
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
    toggleModal(true);
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
          <img src={polygon} alt="" />
          <p className="flex flex-col">
            <span className="font-ibm font-light text-xl">NETWORK</span>
            <span>{chain?.name}</span>
          </p>
        </button>
      </div>

      <MintModal
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
            type="number"
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
