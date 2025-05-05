
import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, date, author, slug }) => {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img src={image} alt={title} />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">{date}</span>
          <span className="blog-author">By {author}</span>
        </div>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="blog-readmore">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
