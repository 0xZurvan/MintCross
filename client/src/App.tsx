import DesktopNav from "./components/DesktopNav";
import Buy from "./components/Mint";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col space-y-20">
        <DesktopNav />
        <Buy />
        <Footer />
      </div>
    </>
  );
}

export default App;
