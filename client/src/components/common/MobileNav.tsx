import { NavLink } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function MobileNav() {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className="lg:hidden bg-gray-dark w-full p-8">
      {menu ? (
        <div className="flex flex-row justify-between items-center">
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
          <GiHamburgerMenu
            onClick={() => handleMenu()}
            className="text-purple w-6 h-6 rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-row justify-around items-center">
          <h2 className="text-white text-2xl font-ibm font-bold">MintCross</h2>
          <ConnectWallet />
          <GiHamburgerMenu
            onClick={() => handleMenu()}
            className="text-purple w-6 h-6"
          />
        </div>
      )}
    </div>
  );
}
