import React from 'react';
import '../styles/Demo.css';

const Demo = () => {
  return (
    <section id="demo" className="demo">
      <div className="demo-container">
        <div className="section-header">
          <h2>데모</h2>
          <p>띠부띠부 챗의 실제 동작을 확인해보세요</p>
        </div>
        
        <div className="demo-content">
          <div className="demo-video">
            <div className="video-placeholder">
              <div className="play-button">
                <span>▶</span>
              </div>
              <p>데모 영상</p>
            </div>
          </div>
          
          <div className="demo-features">
            <h3>데모에서 확인할 수 있는 기능:</h3>
            <ul>
              <li>대화 그룹화 기능</li>
              <li>그룹 조합 및 대화 시작</li>
              <li>AI 응답 최적화</li>
              <li>사용자 인터페이스</li>
              <li>실시간 채팅 기능</li>
            </ul>
            
            <button className="demo-button">
              라이브 데모 체험하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;