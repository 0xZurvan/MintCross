import DesktopNav from "./components/DesktopNav";
import Footer from "./components/Footer";
import Mint from "./pages/Mint";
import Bridge from "./pages/Bridge";
import { Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs";

function App() {
  return (
    <>
      <div className="flex flex-col space-y-20">
        <DesktopNav />
        <Routes>
          <Route path="/" element={<Mint />}></Route>
          <Route path="/bridge" element={<Bridge />}></Route>
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
