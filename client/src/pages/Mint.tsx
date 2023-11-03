import Button from "../components/Button";
import { useAccount, useNetwork } from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import { useNetworkStore } from "../stores/useNetworkStore";
import { useShallow } from 'zustand/react/shallow'

export default function Mint() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [toggleModal] =
    useNetworkStore(
      useShallow((state) => [
        state.toggleModal,
      ])
    );

  const openModal = () => {
    toggleModal(true)
  }
  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-3xl font-ibm font-bold text-center">
        Step 1: Mint OFT
      </h1>

      <div className="flex flex-col space-y-4 w-full">
        <h2 className="text-white text-lg font-ibm font-medium">
          SELECT CHAIN:
        </h2>
        <button onClick={openModal} className="w-full bg-gray-dark border-2 border-gray-medium text-start font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg">
          NETWORK: { chain?.name }
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
          <ConnectWallet className="w-full"/>
        )}
      </div>
    </div>
  );
}
