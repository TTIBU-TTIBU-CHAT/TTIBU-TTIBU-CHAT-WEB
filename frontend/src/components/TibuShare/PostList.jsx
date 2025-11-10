export function PostList({ posts, searchTerm, onSearch, onLike }) {
  return (
    <section id="public-list" className="public-list-section">
      <div className="public-list-container">
        <h2>공개된 대화 모음</h2>
        <p className="list-description">
          다른 사용자들이 공유한 유용한 대화들을 확인하세요
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={onSearch}
            aria-label="대화 검색"
          />
        </div>

        <div className="share-grid">
          {posts.map((share) => (
            <div key={share.id} className="share-card">
              <div className="share-header">
                <h3>{share.title}</h3>
                <span className="share-author">by {share.author}</span>
              </div>
              <p className="share-description">{share.description}</p>
              <div className="share-footer">
                <span className="share-date">{share.date}</span>
                <div className="share-actions">
                  <button className="action-button view-button">
                    자세히 보기
                  </button>
                  <button
                    className="action-button like-button"
                    onClick={() => onLike(share.id)}
                    aria-label={`좋아요 ${share.likes}개`}
                  >
                    ❤ {share.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
