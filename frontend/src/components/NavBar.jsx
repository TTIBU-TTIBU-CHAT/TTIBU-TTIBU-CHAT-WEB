import React from 'react';
import '../styles/NavBar.css';

const NavBar = ({ theme, toggleTheme }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span>띠부띠부 챗</span>
        </div>
        
        <ul className="nav-menu">
          <li><button onClick={() => scrollToSection('features')}>Features</button></li>
          <li><button onClick={() => scrollToSection('docs')}>Docs</button></li>
          <li><button onClick={() => scrollToSection('teams')}>Teams</button></li>
          <li><button onClick={() => scrollToSection('demo')}>Demo</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          <li><button className="cta-button" onClick={() => scrollToSection('docs')}>Get Started</button></li>
        </ul>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'theme-white' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;