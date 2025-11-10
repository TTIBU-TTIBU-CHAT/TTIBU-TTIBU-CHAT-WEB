import { useEffect } from 'react';

export function PostDetailModal({ post, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDownload = () => {
    const blob = new Blob([post.jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return jsonString;
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{post.title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="post-meta">
            <span className="post-author">작성자: {post.username}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
          </div>

          {post.description && (
            <div className="post-description">
              <h3>설명</h3>
              <p>{post.description}</p>
            </div>
          )}

          <div className="post-json-content">
            <div className="json-header">
              <h3>JSON 내용</h3>
              <button className="download-button" onClick={handleDownload}>
                📥 다운로드
              </button>
            </div>
            <pre className="json-display">
              <code>{formatJson(post.jsonContent)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
