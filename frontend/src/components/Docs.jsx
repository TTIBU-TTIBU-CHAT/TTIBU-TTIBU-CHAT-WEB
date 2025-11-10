import '../styles/Docs.css';

function Docs() {
  return (
    <section id="docs" className="docs">
      <div className="docs-container">
        <h2 className="section-title">문서</h2>
        <p className="docs-description">
          띠부띠부챗의 사용법과 API 문서를 확인하세요.
        </p>
        <div className="docs-content">
          <div className="docs-card">
            <h3>빠른 시작</h3>
            <p>5분 안에 띠부띠부챗을 시작하는 방법을 알아보세요.</p>
            <a href="#" className="docs-link">시작하기 →</a>
          </div>
          <div className="docs-card">
            <h3>API 문서</h3>
            <p>전체 API 레퍼런스와 사용 예제를 확인하세요.</p>
            <a href="#" className="docs-link">문서 보기 →</a>
          </div>
          <div className="docs-card">
            <h3>가이드</h3>
            <p>상세한 사용 가이드와 튜토리얼을 제공합니다.</p>
            <a href="#" className="docs-link">가이드 보기 →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Docs;
