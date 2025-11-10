import { useState } from 'react';
import '../styles/NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToTibuShare = () => {
    window.location.href = '/tibu-share';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          띠부띠부챗
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li onClick={() => scrollToSection('features')}>Features</li>
          <li onClick={() => scrollToSection('docs')}>Docs</li>
          <li onClick={() => scrollToSection('teams')}>Teams</li>
          <li onClick={() => scrollToSection('demo')}>Demo</li>
          <li onClick={() => scrollToSection('contact')}>Contact</li>
          <li onClick={navigateToTibuShare}>띠부 공유</li>
          <li>
            <button
              className="cta-button"
              onClick={() => scrollToSection('docs')}
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
