import '../styles/Hero.css';

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">띠부띠부챗</h1>
        <p className="hero-description">
          ChatGPT, Claude, Gemini 같은 대화형 생성 AI들의 대화 기록을 그룹화하고 관리       
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('docs')}
          >
            Get Started
          </button>
          <a
            href="https://github.com/TTIBU-TTIBU-CHAT/TTIBU-TTIBU-CHAT.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
