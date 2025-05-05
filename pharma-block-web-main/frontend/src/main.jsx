// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { EthProvider } from "./pages/ethContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EthProvider>
      <App />
    </EthProvider>
  </React.StrictMode>
);
