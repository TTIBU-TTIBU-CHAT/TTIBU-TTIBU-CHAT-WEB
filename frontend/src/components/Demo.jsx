import '../styles/Demo.css';

function Demo() {
  return (
    <section id="demo" className="demo">
      <div className="demo-container">
        <h2 className="section-title">데모</h2>
        <p className="demo-description">
          띠부띠부챗의 실제 동작을 확인해보세요.
        </p>
        <div className="demo-content">
          <div className="demo-video">
            <div className="video-placeholder">
              <p>🎥 데모 영상</p>
              <p className="demo-text">곧 공개됩니다!</p>
            </div>
          </div>
          <div className="demo-features">
            <h3>주요 시연 내용</h3>
            <ul>
              <li>✓ 대화 그룹화 기능</li>
              <li>✓ AI 기반 대화 요약</li>
              <li>✓ 버전 관리 시스템</li>
              <li>✓ 실시간 채팅 기능</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;
