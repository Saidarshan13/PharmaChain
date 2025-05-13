
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span>pharma</span>
              <span className="chain">Chain</span>
            </h3>
            <p className="footer-description">
              Revolutionizing pharmaceutical supply chains with blockchain technology for enhanced transparency, security, and authenticity.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>Email: contact@pharmachain.io</li>
              <li>Phone: +91 1010 001  001</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} pharmaChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
