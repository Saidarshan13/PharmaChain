
// import React, { useState } from 'react';
// import { Wallet } from 'lucide-react';
// import './ConnectWallet.css';

// const ConnectWallet: React.FC = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [walletAddress, setWalletAddress] = useState('');

//   const connectWallet = () => {
//     if (typeof window.ethereum !== 'undefined') {
//       // Request account access
//       window.ethereum.request({ method: 'eth_requestAccounts' })
//         .then((accounts: string[]) => {
//           setWalletAddress(accounts[0]);
//           setIsConnected(true);
//           console.log('Connected to wallet:', accounts[0]);
//         })
//         .catch((error: any) => {
//           console.error('Error connecting to wallet:', error);
//         });
//     } else {
//       alert('Please install MetaMask or another Ethereum wallet provider to connect');
//     }
//   };

//   const disconnectWallet = () => {
//     setIsConnected(false);
//     setWalletAddress('');
//   };

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   return (
//     <div className="wallet-container">
//       {isConnected ? (
//         <div className="wallet-connected">
//           <span className="wallet-address">{truncateAddress(walletAddress)}</span>
//           <button className="disconnect-btn" onClick={disconnectWallet}>
//             Disconnect
//           </button>
//         </div>
//       ) : (
//         <button className="connect-btn" onClick={connectWallet}>
//           <Wallet size={18} />
//           <span>Connect Wallet</span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default ConnectWallet;



import React, { useContext } from 'react';
import { Wallet } from 'lucide-react';
import './ConnectWallet.css';
import { EthContext } from '../pages/ethContext'; 

interface EthContextType {
  isConnected: boolean;
  currentAccount: string | null;
  loadWeb3: () => void;
  disconnectWallet: () => void;
}

const ConnectWallet: React.FC = () => {
  const context = useContext(EthContext) as EthContextType;

  const { isConnected, currentAccount, loadWeb3, disconnectWallet } = context;

  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-container">
      {isConnected && currentAccount ? (
        <div className="wallet-connected">
          <span className="wallet-address">{truncateAddress(currentAccount)}</span>
          <button className="disconnect-btn" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="connect-btn" onClick={loadWeb3}>
          <Wallet size={18} />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;

