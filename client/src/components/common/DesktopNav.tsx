import { NavLink } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

export default function DesktopNav() {
  return (
    <div className="hidden bg-gray-dark w-full lg:flex flex-row justify-around items-center p-8">
      <h2 className="text-white text-2xl font-ibm font-bold">MintCross</h2>
      <ul className="flex flex-row justify-center w-fit mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm font-ibm font-semibold p-4 rounded-l-lg"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-l-lg"
          }
        >
          MINT
        </NavLink>
        <NavLink
          to="/bridge"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm font-ibm font-semibold p-4"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4"
          }
        >
          BRIDGE
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm font-ibm font-semibold p-4 rounded-r-lg"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-r-lg"
          }
        >
          DOCS
        </NavLink>
      </ul>
      <ConnectWallet />
    </div>
  );
}
