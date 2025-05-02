import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact with Me</h2>
      <div className="contact-details">
        <div className="contact-item">
          <i className="fab fa-github"></i>
          <a href="https://github.com/sampathkumar210304" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="contact-item">
          <i className="fab fa-linkedin"></i>
          <a href="https://linkedin.com/in/sampath-dheekonda" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact; 