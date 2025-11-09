import React from 'react';
import { features } from '../data/features.js';
import '../styles/Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="section-header">
          <h2>주요 기능</h2>
          <p>띠부띠부 챗이 제공하는 강력한 기능들을 확인해보세요</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <span>🚀</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;