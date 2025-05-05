
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import { Menu } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span>pharma</span>
          <span className="chain">Chain</span>
        </Link>
        
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <Menu />
        </div>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/blogs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Blogs
          </Link>
          {/* <Link to="/stakeholders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Stakeholders
          </Link>
          <Link to="/owner" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Owner
          </Link> */}
          <Link to="/trackMedicine" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Track Medicine
          </Link>
        </nav>
        
        <div className="connect-wallet-wrapper">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
