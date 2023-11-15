import DesktopNav from "./components/common/DesktopNav";
import MobileNav from "./components/common/MobileNav.tsx";
import Footer from "./components/common/Footer.tsx";
import Mint from "./pages/Mint";
import Bridge from "./pages/Bridge";
import SwitchNetworkModal from "./components/SwitchNetworkModal";
import { Routes, Route } from "react-router-dom";
import { WagmiConfig, useNetwork, useAccount } from "wagmi";
import { config } from "./utils/wagmiConfig.ts";
import { useMintCrossStore } from "../src/stores/useMintCrossStore";
import { useNetworkStore } from "../src/stores/useNetworkStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

function App() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const [setAddress] = useMintCrossStore(
    useShallow((state) => [state.setAddress, state.mintCrossAddress])
  );
  const [setCurrentNetwork, setChains] = useNetworkStore(
    useShallow((state) => [state.setCurrentNetwork, state.setChains])
  );

  useEffect(() => {
    const _setAddress = () => {
      setAddress(chain?.id);
    };

    const _setCurrentNetwork = () => {
      setCurrentNetwork(chain?.id);
    };

    const _setChains = () => {
      setChains(chain?.id);
    };

    _setAddress();
    _setCurrentNetwork();
    _setChains();
  }, [chain, isConnected]);

  return (
    <WagmiConfig config={config}>
      <div className="relative z-[100] flex flex-col space-y-20">
        <div>
          <MobileNav />
          <DesktopNav />
        </div>
        <SwitchNetworkModal />
        <Routes>
          <Route path="/" element={<Mint />}></Route>
          <Route path="/bridge" element={<Bridge />}></Route>
        </Routes>
        <Footer />
      </div>
    </WagmiConfig>
  );
}

export default App;
