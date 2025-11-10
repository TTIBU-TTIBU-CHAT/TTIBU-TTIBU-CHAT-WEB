import { useState } from 'react';
import '../styles/TibuShare.css';

function TibuShare() {
  const [shares, setShares] = useState([
    {
      id: 1,
      title: "React 학습 정리",
      author: "김싸피",
      description: "React Hooks와 상태 관리에 대한 대화 모음",
      date: "2025-01-15",
      likes: 24
    },
    {
      id: 2,
      title: "알고리즘 문제 풀이",
      author: "이싸피",
      description: "동적 프로그래밍 문제 해결 과정",
      date: "2025-01-14",
      likes: 18
    },
    {
      id: 3,
      title: "Spring Boot 프로젝트 설정",
      author: "박싸피",
      description: "Spring Boot와 JPA 설정 관련 대화",
      date: "2025-01-13",
      likes: 32
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredShares = shares.filter(
    (share) =>
      share.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id) => {
    setShares((prevShares) =>
      prevShares.map((share) =>
        share.id === id ? { ...share, likes: share.likes + 1 } : share
      )
    );
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="tibu-share">
      <nav className="tibu-share-nav">
        <button className="back-button" onClick={goBack}>
          ← 뒤로가기
        </button>
        <h1>띠부 공유</h1>
      </nav>

      <div className="tibu-share-container">
        <div className="tibu-share-header">
          <h2>공유된 대화 모음</h2>
          <p>다른 사용자들이 공유한 유용한 대화들을 확인하세요</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="share-grid">
          {filteredShares.map((share) => (
            <div key={share.id} className="share-card">
              <div className="share-header">
                <h3>{share.title}</h3>
                <span className="share-author">by {share.author}</span>
              </div>
              <p className="share-description">{share.description}</p>
              <div className="share-footer">
                <span className="share-date">{share.date}</span>
                <button
                  className="like-button"
                  onClick={() => handleLike(share.id)}
                >
                  ❤ {share.likes}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShares.length === 0 && (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TibuShare;
