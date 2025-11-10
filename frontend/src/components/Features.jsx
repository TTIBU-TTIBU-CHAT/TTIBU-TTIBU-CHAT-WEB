import { features } from '../data/features';
import '../styles/Features.css';

function Features() {
  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">주요 기능</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
