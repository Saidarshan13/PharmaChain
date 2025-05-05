import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import StyledAlert from "../components/alert";

export const EthContext = createContext();

export const EthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [Alert, setAlert] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("User denied account access");
        setIsConnected(false);
      }
    } else {
      setAlert("Non-Ethereum browser detected. You should consider trying MetaMask!");
      setIsConnected(false);
    }
  };

  // auto connect if already authorized
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          setIsConnected(true);
        }
      });
    }
  }, []);

  return (
    <>
    {Alert !== "" && <StyledAlert message={Alert} onClose={() => setAlert("")} />}
    <EthContext.Provider value={{ isConnected, currentAccount, loadWeb3 }}>
      {children}
    </EthContext.Provider></>
  );
};
