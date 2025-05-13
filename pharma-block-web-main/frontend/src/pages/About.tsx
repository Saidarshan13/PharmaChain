
import React from 'react';
import './About.css';

const About: React.FC = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Former pharmaceutical executive with 15+ years of experience in supply chain management."
    },
    {
      name: "Mark Williams",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      bio: "Blockchain developer with expertise in distributed ledger systems and smart contracts."
    },
    {
      name: "Jennifer Lee",
      role: "COO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio: "Supply chain optimization specialist focusing on healthcare industry compliance."
    },
    {
      name: "David Chen",
      role: "VP of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Product strategist experienced in building enterprise SaaS solutions."
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="about-title">About pharmaChain</h1>
          <p className="about-subtitle">Our mission is to create a transparent and secure pharmaceutical supply chain</p>
        </div>
      </div>
      
      <section className="about-story section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" alt="Our story" />
            </div>
            <div className="about-content">
              <h2>Our Story</h2>
              <p>
                pharmaChain was founded in 2023 with a clear vision: to combat the global problem 
                of counterfeit medications and improve pharmaceutical supply chain transparency using 
                blockchain technology.
              </p>
              <p>
                After witnessing the challenges faced by pharmaceutical companies in tracking their 
                products and ensuring authenticity, our founder Dr. Sarah Johnson assembled a team 
                of blockchain experts and supply chain specialists to develop a comprehensive solution.
              </p>
              <p>
                Today, pharmaChain serves leading pharmaceutical companies worldwide, helping them 
                ensure the integrity and authenticity of their products from manufacturing to end consumer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-mission section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <h3>Vision</h3>
              <p>
                To create a world where every medication can be verified for authenticity, 
                ensuring patient safety and trust in the pharmaceutical industry.
              </p>
            </div>
            <div className="mission-card">
              <h3>Mission</h3>
              <p>
                To provide cutting-edge blockchain solutions that enable transparency, 
                traceability, and trust throughout the pharmaceutical supply chain.
              </p>
            </div>
            <div className="mission-card">
              <h3>Values</h3>
              <p>
                Integrity, innovation, security, and collaboration drive everything we do 
                at pharmaChain as we work to transform the pharmaceutical industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Us</h2>
              <p>
                Have questions about pharmaChain? We'd love to hear from you. 
                Reach out to our team for more information about our solutions.
              </p>
              <ul className="contact-list">
                <li>
                  <strong>Email:</strong> contact@pharmachain.io
                </li>
                <li>
                  <strong>Phone:</strong> +91 1010 001  001
                </li>
                <li>
                  <strong>Address:</strong> Hyderabad,Telangana,India
                </li>
              </ul>
            </div>
            <div className="contact-form">
              <h2>Send a Message</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
