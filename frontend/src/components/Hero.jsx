import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title" style={{color: '#2563eb', fontSize: '4rem'}}>띠부띠부 챗</h1>
          <p className="hero-subtitle" style={{color: '#6b7280', fontSize: '1.5rem'}}>
            GPT 대화 내용을 그룹화하고 조합해서 효율적으로 관리하는 AI 챗봇 서비스
          </p>
          <p className="hero-description" style={{color: '#6b7280', fontSize: '1.125rem'}}>
            대화를 주제별로 분류하고, 그룹들을 선택적으로 조합하여 
            더욱 스마트한 AI 대화 경험을 만들어보세요.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              style={{background: '#2563eb', color: 'white', padding: '1rem 2rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer'}}
              onClick={() => scrollToSection('docs')}
            >
              Get Started
            </button>
            <button 
              className="btn-secondary" 
              style={{background: 'transparent', color: '#2563eb', border: '2px solid #2563eb', padding: '1rem 2rem', borderRadius: '0.75rem', cursor: 'pointer'}}
              onClick={() => window.open('https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB', '_blank')}
            >
              View on GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;