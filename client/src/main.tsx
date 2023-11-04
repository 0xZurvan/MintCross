import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { config } from "./utils/wagmiConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
