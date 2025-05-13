
import React from 'react';
import BlogCard from '../components/BlogCard';
import './Blogs.css';

const Blogs: React.FC = () => {
  const blogPosts = [
    {
      title: "Blockchain: The Future of Pharmaceutical Supply Chain",
      excerpt: "Learn how blockchain technology is transforming the way medications are tracked and verified...",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "May 2, 2023",
      author: "Dr. Sarah Johnson",
      slug: "blockchain-future-pharmaceutical-supply-chain"
    },
    {
      title: "Combating Counterfeit Medications with Distributed Ledger Technology",
      excerpt: "Discover how DLT provides an effective solution to the global problem of counterfeit medications...",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "April 15, 2023",
      author: "Mark Williams",
      slug: "combating-counterfeit-medications-dlt"
    },
    {
      title: "Smart Contracts in Pharmaceutical Distribution",
      excerpt: "Explore how smart contracts automate and secure agreements between pharmaceutical supply chain partners...",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: "March 28, 2023",
      author: "Jennifer Lee",
      slug: "smart-contracts-pharmaceutical-distribution"
    },
    {
      title: "Regulatory Compliance and Blockchain in Pharma",
      excerpt: "How blockchain technology helps pharmaceutical companies meet complex regulatory requirements...",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      date: "March 10, 2023",
      author: "David Chen",
      slug: "regulatory-compliance-blockchain-pharma"
    },
    {
      title: "The Role of IoT in Pharmaceutical Supply Chain Tracking",
      excerpt: "Understanding how IoT devices work together with blockchain to enhance medication tracking...",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      date: "February 22, 2023",
      author: "Dr. Sarah Johnson",
      slug: "role-iot-pharmaceutical-supply-chain"
    },
    {
      title: "Case Study: How Company X Implemented pharmaChain",
      excerpt: "A detailed look at how a leading pharmaceutical company implemented our blockchain solution...",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: "January 18, 2023",
      author: "Mark Williams",
      slug: "case-study-company-x-implementation"
    }
  ];

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <div className="container">
          <h1 className="blogs-title">Blog & Insights</h1>
          <p className="blogs-subtitle">Stay updated with the latest news and insights from the pharmaceutical blockchain world</p>
        </div>
      </div>
      
      <section className="blogs-content section">
        <div className="container">
          <div className="blogs-grid">
            {blogPosts.map((post, index) => (
              <div className="blog-item" key={index}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                />
              </div>
            ))}
          </div>
          
        
        </div>
      </section>
      
      <section className="blog-subscribe section">
        <div className="container">
          <div className="subscribe-box">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay up-to-date with the latest insights and news on pharmaceutical supply chain innovation</p>
            <form className="subscribe-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
