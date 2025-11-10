import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToTibuShare = () => {
    window.history.pushState({}, '', '/tibu-share');
    window.dispatchEvent(new Event('popstate'));
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new Event('popstate'));
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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
          aria-label="메뉴 토글"
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
          <li>
            {isAuthenticated ? (
              <div className="auth-info">
                <span className="user-name">{user?.name}</span>
                <button className="logout-button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <button className="login-button" onClick={handleLogin}>
                로그인
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
