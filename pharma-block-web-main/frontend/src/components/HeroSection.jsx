import './HeroSection.css';
import React, { useContext, useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EthContext } from '../pages/ethContext.jsx';

export default function HeroSection() {
  const ethContext = useContext(EthContext);
  const { isConnected, currentAccount, loadWeb3 } = ethContext || {};
  const [role, setRole] = useState("Get Started");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isConnected);
    if(currentAccount){
    if (currentAccount === "0x1d36bb9eb136c90a7778312b6716ec2242eb6193") {
      setRole("Owner");
    } else {
      setRole("StakeHolders");
    }console.log(role);
  }
  }, [currentAccount]);

  const handleClick = () => {
    if (role === "Owner") {
      navigate("/owner"); 
    } else if (role === "StakeHolders") {
      navigate("/stakeholders");
    } else {
      navigate("/"); 
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Blockchain Technology for <span className="highlight">Pharmaceutical</span> Supply Chain
          </h1>
          <p className="hero-subtitle">
            Track, verify, and secure your pharmaceutical supply chain with cutting-edge blockchain technology.
          </p>
          <div className="hero-buttons">
            {!isConnected ? (
              <button className="btn" onClick={loadWeb3}>Connect Wallet</button>
            ) : (
              <>
              <button className="btn" onClick={handleClick}>
                {role}
              </button>
            <button className="btn btn-outline">Learn More</button>
            </>)}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-blob"></div>
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
            alt="Blockchain technology illustration" 
            className="main-image"
          />
        </div>
      </div>
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
