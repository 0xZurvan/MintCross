import DesktopNav from "./components/DesktopNav";
import Footer from "./components/Footer";
import Mint from "./pages/Mint";
import Bridge from "./pages/Bridge";
import { Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs";
import SwitchNetworkModal from "./components/SwitchNetworkModal";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./utils/wagmiConfig";

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
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
