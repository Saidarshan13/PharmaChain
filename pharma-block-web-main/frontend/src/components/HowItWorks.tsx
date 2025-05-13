
import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Supply Chain",
      description: "Integrate your existing systems with pharmaChain to start recording data on the blockchain."
    },
    {
      number: "02",
      title: "Record Product Journey",
      description: "Track each step of your product's journey from manufacturing to end customer with immutable records."
    },
    {
      number: "03",
      title: "Verify Authenticity",
      description: "Enable customers and partners to verify the authenticity and history of medications."
    },
    {
      number: "04",
      title: "Analyze & Optimize",
      description: "Use data insights to identify bottlenecks and improve your supply chain efficiency."
    }
  ];

  return (
    <section className="section how-it-works-section" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">A simple process to revolutionize your pharmaceutical supply chain</p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
        
        <div className="how-it-works-image">
          <img 
            src="https://zurology.com/wp-content/uploads/2020/09/AdobeStock_300546901.jpeg" 
            alt="Supply chain visualization" 
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
