import DesktopNav from "./components/DesktopNav";
import Footer from "./components/Footer";
import Mint from "./pages/Mint";
import Bridge from "./pages/Bridge";
import SwitchNetworkModal from "./components/SwitchNetworkModal";
import Docs from "./pages/Docs";
import { Routes, Route } from "react-router-dom";
import { WagmiConfig, useNetwork } from "wagmi";
import { config } from "./utils/wagmiConfig.ts";
import { useMintCrossStore } from "../src/stores/useMintCrossStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

function App() {
  const { chain } = useNetwork();
  const [setAddress] = useMintCrossStore(
    useShallow((state) => [state.setAddress, state.mintCrossAddress])
  );

  useEffect(() => {
    const _setAddress = () => {
      setAddress(chain?.id);
    };

    _setAddress();
  }, [chain]);

  return (
    <WagmiConfig config={config}>
      <div className="relative z-[100] flex flex-col space-y-20">
        <DesktopNav />
        <SwitchNetworkModal />
        <Routes>
          <Route path="/" element={<Mint />}></Route>
          <Route path="/bridge" element={<Bridge />}></Route>
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
        <Footer />
      </div>
    </WagmiConfig>
  );
}

export default App;
