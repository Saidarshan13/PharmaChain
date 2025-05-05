
import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Truck, Building, Archive } from 'lucide-react';
import './Stakeholders.css';

const Stakeholders: React.FC = () => {
  const stakeholders = [
    {
      name: "Raw Material Supplier",
      description: "Provide and approve raw materials for pharmaceutical production",
      icon: Archive,
      path: "/supplier"
    },
    {
      name: "Manufacturer",
      description: "Process raw materials and produce medicines",
      icon: Factory,
      path: "/manufacturer"
    },
    {
      name: "Distributor",
      description: "Distribute medicines to retailers across the country",
      icon: Truck,
      path: "/distributor"
    },
    {
      name: "Retailer",
      description: "Sell medicines to customers and request stock from owner",
      icon: Building,
      path: "/retailer"
    }
  ];

  return (
    <div className="stakeholders-page">
      <div className="stakeholders-container">
        <h1 className="stakeholders-title">Stakeholder Portal</h1>
        <div className="stakeholder-cards">
          {stakeholders.map((stakeholder, index) => (
            <div className="stakeholder-card" key={index}>
              <div className="stakeholder-icon">
                <stakeholder.icon />
              </div>
              <h2 className="stakeholder-name">{stakeholder.name}</h2>
              <p className="stakeholder-description">{stakeholder.description}</p>
              <Link to={stakeholder.path}>
                <button className="stakeholder-login-btn">Login</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stakeholders;
