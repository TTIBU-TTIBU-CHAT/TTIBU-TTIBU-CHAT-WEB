import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>띠부띠부 챗 - 데모</h1>
        <p className="subtitle">GPT 대화 내용을 그룹화하고 조합해서 효율적으로 관리하는 AI 챗봇 서비스</p>
      </header>

      <section className="intro">
        <h2>프로젝트 소개</h2>
        <p>
          GPT 대화 내용을 그룹화하고, 그룹화한 것들을 선택 후 조합해
          그룹화한 것들을 기반으로 대화를 진행할 수 있는 서비스입니다.
        </p>
      </section>

      <section className="features">
        <h2>주요 기능</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>GMS 키 관리</h3>
            <p>Google Message Service 키를 안전하게 관리합니다.</p>
          </div>

          <div className="feature-card">
            <h3>띠부 버전관리</h3>
            <p>대화 버전을 체계적으로 관리하고 추적합니다.</p>
          </div>

          <div className="feature-card">
            <h3>띠부 그룹화</h3>
            <p>GPT 대화 내용을 주제별로 그룹화합니다.</p>
          </div>

          <div className="feature-card">
            <h3>띠부 요약</h3>
            <p>긴 대화 내용을 간결하게 요약합니다.</p>
          </div>

          <div className="feature-card">
            <h3>채팅</h3>
            <p>실시간 AI 채팅 기능을 제공합니다.</p>
          </div>

          <div className="feature-card">
            <h3>띠부 그룹 관리</h3>
            <p>그룹 생성, 해제, 수정 등 전반적인 그룹 관리 기능</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
