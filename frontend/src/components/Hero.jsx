import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import '../styles/Hero.css';

function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const navigateToDocs = () => {
    window.history.pushState({}, '', '/docs');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{t.title}</h1>
        <p className="hero-description">
          {t.subtitle}
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={navigateToDocs}
          >
            {t.getStarted}
          </button>
          <a
            href="https://github.com/TTIBU-TTIBU-CHAT/TTIBU-TTIBU-CHAT.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            {t.github}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
