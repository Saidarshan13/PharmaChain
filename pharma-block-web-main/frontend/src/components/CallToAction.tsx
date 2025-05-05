
import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Supply Chain?</h2>
          <p className="cta-description">
            Join the pharmaceutical companies already using pharmaChain to ensure transparency, 
            authenticity, and compliance throughout their supply chains.
          </p>
          <div className="cta-buttons">
            <Link to="/trackMedicine">
              <button className="btn">Track Medicine</button>
            </Link>
            <Link to="/stakeholders">
              <button className="btn btn-outline cta-outline">Stakeholder Portal</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
