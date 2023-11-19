import DesktopNav from "./components/common/DesktopNav";
import MobileNav from "./components/common/MobileNav";
import Footer from "./components/common/Footer";
import SwitchNetworkModal from "./components/SwitchNetworkModal";
import { Routes, Route } from "react-router-dom";
import { WagmiConfig, useNetwork, useAccount } from "wagmi";
import { config } from "./utils/wagmiConfig.ts";
import { useMintCrossStore } from "../src/stores/useMintCrossStore";
import { useNetworkStore } from "../src/stores/useNetworkStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import Bridge from "./pages/Bridge";
import Mint from "./pages/Mint";
import Docs from "./pages/Docs";

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
      <div className="flex flex-col place-content-between min-h-screen space-y-20">
        <div>
          <MobileNav />
          <DesktopNav />
        </div>
        <div>
          <SwitchNetworkModal />
          <Routes>
            <Route path="/" element={<Mint />}></Route>
            <Route path="/bridge" element={<Bridge />}></Route>
            <Route path="/docs" element={<Docs />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </WagmiConfig>
  );
}

export default App;
