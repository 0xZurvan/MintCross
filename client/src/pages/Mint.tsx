import Button from "../components/Button";
import { useAccount, useNetwork } from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import { useNetworkStore } from "../stores/useNetworkStore";
import { useShallow } from "zustand/react/shallow";
import polygon from "../assets/polygon.svg";

export default function Mint() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [toggleModal] = useNetworkStore(
    useShallow((state) => [state.toggleModal])
  );

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

      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="flex flex-col w-full">
          <p className="text-white text-lg font-ibm font-medium">AMOUNT:</p>
          <input
            className=" bg-gray-dark border-2 border-gray-medium rounded-lg p-2 text-white"
            type="number"
          />
        </div>
        {isConnected ? (
          <Button title="MINT" className="w-full text-xl" onClick={() => {}} />
        ) : (
          <ConnectWallet className="w-full" />
        )}
      </div>
    </div>
  );
}
