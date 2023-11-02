import { NavLink } from "react-router-dom";

export default function DesktopNav() {
  return (
    <div className="bg-gray-dark w-full flex flex-row justify-around items-center p-8">
      <h2 className="text-white text-xl font-ibm font-bold">MintCross</h2>
      <ul className="flex flex-row justify-center w-fit mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-l-lg"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-l-lg"
          }
        >
          MINT
        </NavLink>
        <NavLink
          to="/bridge"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4"
          }
        >
          BRIDGE
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            isActive
              ? "bg-purple text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-r-lg"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4 rounded-r-lg"
          }
        >
          DOCS
        </NavLink>
      </ul>
      <button className="bg-purple font-ibm font-semibold hover:bg-gray-medium text-white py-4 px-4 rounded-lg">
        Connect Wallet
      </button>
    </div>
  );
}
