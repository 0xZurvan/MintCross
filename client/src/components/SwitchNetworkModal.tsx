import { useShallow } from "zustand/react/shallow";
import { useNetworkStore } from "../stores/useNetworkStore";
import polygon from "../assets/polygon.svg";
import eth from "../assets/eth.svg";
import { FiXCircle } from "react-icons/fi";
import { CHAIN_IDS } from "../consts/chainIds";

interface NetworProps {
  name: string;
  img: string;
  onClick: () => void;
}

function Network({ name, img, onClick }: NetworProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-gray-medium hover:bg-opacity-70 hover:rounded-lg p-4 w-full flex flex-row justify-start space-x-4"
    >
      <img className="w-6 lg:w-8 h-6 lg:h-8 rounded-full" src={img} alt="" />
      <p className="font-ibm font-semibold text-gray-light text-base lg:text-lg">{name}</p>
    </button>
  );
}

export default function SwitchNetworkModal() {
  const [isNetworkModalOpen, switchNetwork, toggleNetworkModal] =
    useNetworkStore(
      useShallow((state) => [
        state.isNetworkModalOpen,
        state.switchNetwork,
        state.toggleNetworkModal,
      ])
    );

  const closeModal = () => {
    toggleNetworkModal(false);
  };

  const handleSwitchNetwork = async (chainOption: number) => {
    if (chainOption === 1) {
      await switchNetwork(CHAIN_IDS.sepolia);
    } else if (chainOption === 2) {
      await switchNetwork(CHAIN_IDS.mumbai);
    }
  };

  return (
    <>
      {isNetworkModalOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 shadow-xl">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" />
          <div className="w-[min(40vw)] lg:w-[min(30vw)] p-6 bg-gray-dark rounded-lg relative z-50">
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-ibm font-semibold text-gray-light text-lg lg:text-xl">
                Compatible Networks
              </h2>
              <button onClick={closeModal}>
                <FiXCircle className="text-gray-light w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col space-y-6 rounded-lg my-6">
              <li>
                <Network
                  onClick={() => handleSwitchNetwork(1)}
                  name="Sepolia"
                  img={eth}
                />
              </li>
              <li>
                <Network
                  onClick={() => handleSwitchNetwork(2)}
                  name="Mumbai"
                  img={polygon}
                />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
