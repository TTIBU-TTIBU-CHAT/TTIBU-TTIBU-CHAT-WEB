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
          GPT 대화 내용을 그룹화하고 조합해서 효율적으로 관리하는 AI 챗봇 서비스
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('docs')}
          >
            Get Started
          </button>
          <a
            href="https://github.com/yourusername/ttibu-chat"
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
