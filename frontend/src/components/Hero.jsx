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
        <h1 className="hero-title">    흩어진 말들로, 하나의 흐름을 만든다.     </h1>
        <p className="hero-description">
          띠부띠부챗   
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
