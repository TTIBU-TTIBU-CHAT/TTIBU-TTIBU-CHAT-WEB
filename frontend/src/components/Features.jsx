import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import '../styles/Features.css';

function Features() {
  const { language } = useLanguage();
  const t = translations[language].features;

  const features = [
    {
      title: t.attach.title,
      description: t.attach.lines
    },
    {
      title: t.detach.title,
      description: t.detach.lines
    },
    {
      title: t.group.title,
      description: t.group.lines
    },
    {
      title: t.branch.title,
      description: t.branch.lines
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className={`feature-row ${index % 2 === 0 ? 'row-left' : 'row-right'}`}>
            {index % 2 === 0 ? (
              <>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <div className="feature-description">
                    {feature.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="feature-image">
                  <div className="image-placeholder"></div>
                </div>
              </>
            ) : (
              <>
                <div className="feature-image">
                  <div className="image-placeholder"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <div className="feature-description">
                    {feature.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
