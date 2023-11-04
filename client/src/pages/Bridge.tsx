import Button from "../components/Button";
import ConnectWallet from "../components/ConnectWallet";
import { useAccount } from "wagmi";

export default function Bridge() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-3xl font-ibm font-bold text-center">
        Step 2: Bridge OFT 
      </h1>

      <div className="flex flex-col space-y-4 w-full">
        <h2 className="text-white text-lg font-ibm font-medium">
          SELECT CHAIN:
        </h2>
        <p className="w-full bg-gray-dark border-2 border-gray-medium b font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg">
          NETWORK: Mumbai
        </p>
        <p className="w-full bg-gray-dark border-2 border-gray-medium b font-ibm font-semibold hover:text-opacity-80 text-gray-light p-4 rounded-lg">
          CONNECTED TO: Mumbai
        </p>
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
          <Button title="BRIDGE" className="w-full text-xl" onClick={() => {}} />
        ) : (
          <ConnectWallet className="w-full" />
        )}
      </div>
    </div>
  )
}
