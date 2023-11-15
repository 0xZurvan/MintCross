import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { connector, useNetworkStore } from "../../stores/useNetworkStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  className?: string;
}

export default function ConnectWallet({ className }: Props) {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [toggleNetworkModal] = useNetworkStore(
    useShallow((state) => [state.toggleNetworkModal])
  );

  const openModal = () => {
    toggleNetworkModal(true);
  };

  return (
    <>
      {!isConnected ? (
        <button
          onClick={() => connect({ connector })}
          className={`${className} bg-gray-dark border-2 border-gray-medium font-ibm font-semibold hover:text-opacity-80 text-purple text-sm lg:text-base p-4 rounded-lg`}
        >
          CONNECT WALLET
        </button>
      ) : isConnected &&
        (chain?.id === Number(80001) || chain?.id === Number(11155111)) ? (
        <button
          onClick={() => disconnect()}
          className="text-gray-light font-ibm"
        >
          {address?.slice(0, 6)}...{address?.slice(-6)}
        </button>
      ) : chain?.id !== Number(80001) || chain?.id !== Number(11155111) ? (
        <button
          onClick={openModal}
          className={`${className} bg-gray-medium font-ibm font-semibold hover:text-opacity-80 text-purple p-4 rounded-lg`}
        >
          WRONG NETWORK
        </button>
      ) : (
        ""
      )}
    </>
  );
}
