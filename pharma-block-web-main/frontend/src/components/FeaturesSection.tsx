
import React from 'react';
import './FeaturesSection.css';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Enhanced Transparency",
      description: "Track every step of your pharmaceutical supply chain with immutable blockchain records.",
      icon: "🔍"
    },
    {
      title: "Product Authenticity",
      description: "Verify the authenticity of medications and eliminate counterfeit drugs from the supply chain.",
      icon: "✓"
    },
    {
      title: "Regulatory Compliance",
      description: "Easily meet regulatory requirements with comprehensive audit trails and documentation.",
      icon: "📋"
    },
    {
      title: "Real-time Tracking",
      description: "Monitor medicine journey along with the timestamp and location of the medicine",
      icon: "📍"
    },
    {
      title: "Secure Data Exchange",
      description: "Share sensitive information securely between supply chain partners with encryption.",
      icon: "🔒"
    },
    {
      title: "Smart Contracts",
      description: "Automate transactions and agreements with blockchain-based smart contracts.",
      icon: "📝"
    }
  ];

  return (
    <section className="section features-section" id="features">
      <div className="container">
        <h2 className="section-title">Revolutionary Features</h2>
        <p className="section-subtitle">Discover how pharmaChain can transform your pharmaceutical supply chain</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
