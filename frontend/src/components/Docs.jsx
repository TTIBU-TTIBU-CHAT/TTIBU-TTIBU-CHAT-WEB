import React from 'react';
import '../styles/Docs.css';

const Docs = () => {
  return (
    <section id="docs" className="docs">
      <div className="docs-container">
        <div className="section-header">
          <h2>문서</h2>
          <p>띠부띠부 챗을 사용하기 위한 문서와 가이드</p>
        </div>
        
        <div className="docs-content">
          <div className="docs-card">
            <h3>빠른 시작 가이드</h3>
            <p>띠부띠부 챗을 시작하는 가장 빠른 방법을 안내합니다.</p>
            <button className="docs-button">
              시작하기
            </button>
          </div>
          
          <div className="docs-card">
            <h3>API 문서</h3>
            <p>개발자를 위한 상세한 API 문서와 예제를 확인하세요.</p>
            <button className="docs-button">
              API 문서 보기
            </button>
          </div>
          
          <div className="docs-card">
            <h3>사용자 가이드</h3>
            <p>띠부띠부 챗의 모든 기능을 활용하는 방법을 알아보세요.</p>
            <button className="docs-button">
              가이드 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Docs;