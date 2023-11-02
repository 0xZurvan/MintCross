import { useState } from "react";

export default function DesktopNav() {
  const [selectedNav, setSelectedNav] = useState<string>("mint");
  return (
    <div className="bg-gray-dark w-full flex flex-row justify-around items-center p-8">
      <h2 className="text-white text-xl font-ibm font-bold">MintCross</h2>
      <ul className="flex flex-row justify-center w-fit mx-auto">
        <li
          onClick={() => setSelectedNav("mint")}
          className={
            selectedNav === "mint"
              ? "bg-purple text-white text-sm hover:bg-gray-medium rounded-l-lg font-ibm font-semibold p-4"
              : "text-white text-sm hover:bg-gray-medium rounded-l-lg font-ibm font-semibold p-4"
          }
        >
          MINT
        </li>
        <li
          onClick={() => setSelectedNav("bridge")}
          className={
            selectedNav === "bridge"
              ? "bg-purple text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4"
              : "text-white text-sm hover:bg-gray-medium font-ibm font-semibold p-4"
          }
        >
          BRIDGE
        </li>
        <li
          onClick={() => setSelectedNav("docs")}
          className={
            selectedNav === "docs"
              ? "bg-purple text-white text-sm hover:bg-gray-medium rounded-r-lg font-ibm font-semibold p-4"
              : "text-white text-sm hover:bg-gray-medium rounded-r-lg font-ibm font-semibold p-4"
          }
        >
          DOCS
        </li>
        
      </ul>
      <button className="bg-purple font-ibm font-semibold hover:bg-gray-medium text-white py-4 px-4 rounded-lg">
        Connect Wallet
      </button>
    </div>
  );
}
