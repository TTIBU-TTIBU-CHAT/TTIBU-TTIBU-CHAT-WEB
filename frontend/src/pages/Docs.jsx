import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import NavBar from '../components/NavBar';
import '../styles/Docs.css';

function Docs() {
  const { language } = useLanguage();
  const t = translations[language].docs;
  const [activeSection, setActiveSection] = useState('gettingStarted');

  const sections = [
    { id: 'gettingStarted', label: t.sections.gettingStarted },
    { id: 'features', label: t.sections.features },
    { id: 'setup', label: t.sections.setup },
    { id: 'dockerCompose', label: t.sections.dockerCompose }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'gettingStarted':
        return <GettingStarted language={language} />;
      case 'features':
        return <FeaturesDoc language={language} />;
      case 'setup':
        return <Setup language={language} />;
      case 'dockerCompose':
        return <DockerCompose language={language} />;
      default:
        return <GettingStarted language={language} />;
    }
  };

  return (
    <>
      <NavBar />
      <div className="docs-page">
        <aside className="docs-sidebar">
        <h2>{t.title}</h2>
        <nav className="docs-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`docs-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="docs-content">
        {renderContent()}
      </main>
      </div>
    </>
  );
}

function GettingStarted({ language }) {
  return (
    <div className="doc-section">
      <h1>{language === 'ko' ? '시작하기' : 'Getting Started'}</h1>

      <section>
        <h2>{language === 'ko' ? '띠부띠부챗이란?' : 'What is TibuTibuChat?'}</h2>
        <p>
          {language === 'ko'
            ? '띠부띠부챗은 GPT 대화를 시각적으로 관리하고 구조화할 수 있는 혁신적인 도구입니다. 대화의 흐름을 직관적으로 파악하고, 필요한 부분만 선택하여 재구성할 수 있습니다.'
            : 'TibuTibuChat is an innovative tool that allows you to visually manage and structure GPT conversations. You can intuitively understand the flow of conversations and reconstruct only the parts you need.'}
        </p>
      </section>

      <section>
        <h2>{language === 'ko' ? '빠른 시작' : 'Quick Start'}</h2>
        <ol>
          <li>
            <strong>{language === 'ko' ? '설치' : 'Installation'}</strong>
            <pre><code>git clone https://github.com/your-repo/ttibu-ttibu-chat.git
cd ttibu-ttibu-chat
docker-compose up -d</code></pre>
          </li>
          <li>
            <strong>{language === 'ko' ? '접속' : 'Access'}</strong>
            <p>{language === 'ko' ? '브라우저에서 http://localhost:5173 접속' : 'Open http://localhost:5173 in your browser'}</p>
          </li>
          <li>
            <strong>{language === 'ko' ? '회원가입' : 'Sign Up'}</strong>
            <p>{language === 'ko' ? '상단의 회원가입 버튼을 클릭하여 계정을 생성하세요.' : 'Click the sign up button at the top to create an account.'}</p>
          </li>
        </ol>
      </section>
    </div>
  );
}

function FeaturesDoc({ language }) {
  return (
    <div className="doc-section">
      <h1>{language === 'ko' ? '주요 기능' : 'Features'}</h1>

      <section>
        <h2>{language === 'ko' ? '붙이기' : 'Attach'}</h2>
        <p>
          {language === 'ko'
            ? '대화 메시지를 선으로 연결하여 흐름을 시각화합니다. 메시지 간의 관계를 명확히 파악할 수 있습니다.'
            : 'Connect conversation messages with lines to visualize the flow. Clearly understand relationships between messages.'}
        </p>
      </section>

      <section>
        <h2>{language === 'ko' ? '떼기' : 'Detach'}</h2>
        <p>
          {language === 'ko'
            ? '불필요한 연결을 제거하고 대화를 재구성할 수 있습니다.'
            : 'Remove unnecessary connections and restructure conversations.'}
        </p>
      </section>

      <section>
        <h2>{language === 'ko' ? '그룹화' : 'Group'}</h2>
        <p>
          {language === 'ko'
            ? '유사한 주제의 대화를 그룹으로 묶어 체계적으로 관리할 수 있습니다.'
            : 'Bundle conversations with similar topics into groups for systematic management.'}
        </p>
      </section>

      <section>
        <h2>{language === 'ko' ? '분기' : 'Branch'}</h2>
        <p>
          {language === 'ko'
            ? '특정 지점에서 새로운 대화 흐름을 시작할 수 있습니다.'
            : 'Start new conversation flows from specific points.'}
        </p>
      </section>
    </div>
  );
}

function Setup({ language }) {
  return (
    <div className="doc-section">
      <h1>{language === 'ko' ? '설치 및 설정' : 'Setup'}</h1>

      <section>
        <h2>{language === 'ko' ? '사전 요구사항' : 'Prerequisites'}</h2>
        <ul>
          <li>Docker & Docker Compose</li>
          <li>Node.js 18+ (for local development)</li>
          <li>Git</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'ko' ? '환경 변수 설정' : 'Environment Variables'}</h2>
        <p>{language === 'ko' ? '.env.example 파일을 참고하여 .env 파일을 생성하고 다음 변수를 설정하세요:' : 'Create a .env file based on .env.example and configure the following variables:'}</p>
        <h3>.env.example</h3>
        <pre><code>{`# GMS API Configuration
GMS_BASE_URL=https://gms.ssafy.io/gmsapi/

# LiteLLM Configuration
LITELLM_MASTER_KEY=your-litellm-master-key-here

# TTIBU Application Security
# Note: If your secret contains $, escape it with $$ (e.g., ttibu-$$yeahjiyeongtaegyu)
TTIBU_CRYPTO_SECRET=your-crypto-secret-here

# Database Configuration
POSTGRES_USER=tibutibu
POSTGRES_PASSWORD=your_password
POSTGRES_DB=ttibu

# JWT Configuration
JWT_SECRET=your_jwt_secret`}</code></pre>
      </section>

      <section>
        <h2>{language === 'ko' ? '데이터베이스 초기화' : 'Database Initialization'}</h2>
        <pre><code>docker-compose up -d db
docker-compose exec backend ./mvnw spring-boot:run</code></pre>
      </section>
    </div>
  );
}

function DockerCompose({ language }) {
  return (
    <div className="doc-section">
      <h1>Docker Compose</h1>

      <section>
        <h2>{language === 'ko' ? '서비스 구성' : 'Service Architecture'}</h2>
        <p>
          {language === 'ko'
            ? '띠부띠부챗은 다음 서비스들로 구성되어 있습니다:'
            : 'TibuTibuChat consists of the following services:'}
        </p>
        <ul>
          <li><strong>Frontend</strong>: React + Vite</li>
          <li><strong>Backend</strong>: Spring Boot</li>
          <li><strong>Database</strong>: PostgreSQL</li>
          <li><strong>Nginx</strong>: Reverse Proxy</li>
        </ul>
      </section>

      <section>
        <h2>{language === 'ko' ? '기본 명령어' : 'Basic Commands'}</h2>
        <h3>{language === 'ko' ? '시작' : 'Start'}</h3>
        <pre><code>docker-compose up -d</code></pre>

        <h3>{language === 'ko' ? '중지' : 'Stop'}</h3>
        <pre><code>docker-compose down</code></pre>

        <h3>{language === 'ko' ? '로그 확인' : 'View Logs'}</h3>
        <pre><code>docker-compose logs -f [service_name]</code></pre>

        <h3>{language === 'ko' ? '재시작' : 'Restart'}</h3>
        <pre><code>docker-compose restart [service_name]</code></pre>
      </section>

      <section>
        <h2>{language === 'ko' ? '볼륨 관리' : 'Volume Management'}</h2>
        <p>
          {language === 'ko'
            ? '데이터베이스 볼륨을 완전히 삭제하고 초기화하려면:'
            : 'To completely remove and reinitialize the database volume:'}
        </p>
        <pre><code>docker-compose down -v
docker-compose up -d</code></pre>
      </section>
    </div>
  );
}

export default Docs;
