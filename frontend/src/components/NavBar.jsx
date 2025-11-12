import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import '../styles/NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

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

  const navigateToDocs = () => {
    window.history.pushState({}, '', '/docs');
    window.dispatchEvent(new Event('popstate'));
    setIsMenuOpen(false);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
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
        <div className="navbar-logo" onClick={navigateToHome}>
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
          <li onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath === '/' || currentPath === '') {
              scrollToSection('features');
            } else {
              navigateToHome();
              setTimeout(() => scrollToSection('features'), 100);
            }
          }}>Features</li>
          <li onClick={navigateToDocs}>{t.docs}</li>
          <li onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath === '/' || currentPath === '') {
              scrollToSection('demo');
            } else {
              navigateToHome();
              setTimeout(() => scrollToSection('demo'), 100);
            }
          }}>{t.demo}</li>
          <li onClick={navigateToTibuShare}>{t.tibuShare}</li>
          <li>
            <button
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label="언어 변경"
            >
              {language === 'ko' ? '한국어' : 'English'}
            </button>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="auth-info">
                <span className="user-name">{user?.name}</span>
                <button className="logout-button" onClick={handleLogout}>
                  {language === 'ko' ? '로그아웃' : 'Logout'}
                </button>
              </div>
            ) : (
              <button className="login-button" onClick={handleLogin}>
                {language === 'ko' ? '로그인' : 'Login'}
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
