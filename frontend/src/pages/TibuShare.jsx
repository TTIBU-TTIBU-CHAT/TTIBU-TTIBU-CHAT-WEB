import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateJSON, getValidationChecklistStatus, UPLOAD_STATES } from '../utils/jsonValidator';
import '../styles/TibuShare.css';

function TibuShare() {
  const { isAuthenticated, user, fetchWithAuth } = useAuth();
  const [uploadState, setUploadState] = useState(
    isAuthenticated ? UPLOAD_STATES.AUTH_IDLE : UPLOAD_STATES.GUEST_IDLE
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);
  const uploadSectionRef = useRef(null);

  const [shares, setShares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const posts = await response.json();
          setShares(posts.map(post => ({
            id: post.id,
            title: post.title,
            author: post.nickname,
            description: post.description || '',
            preview: JSON.stringify(JSON.parse(post.jsonContent), null, 2).substring(0, 100) + '...',
            date: new Date(post.createdAt).toISOString().split('T')[0],
            likes: 0
          })));
        }
      } catch (error) {
        console.error('게시글 목록 로딩 실패:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setUploadState(isAuthenticated ? UPLOAD_STATES.AUTH_IDLE : UPLOAD_STATES.GUEST_IDLE);
  }, [isAuthenticated]);

  const filteredShares = shares.filter(
    (share) =>
      share.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoginClick = () => {
    window.history.pushState({}, '', '/login?redirect=/tibu-share');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      handleLoginClick();
      return;
    }
    if (uploadSectionRef.current) {
      uploadSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => fileInputRef.current?.focus(), 500);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadState(UPLOAD_STATES.VALIDATING);
    setSelectedFile(file);
    setStatusMessage('검사 중...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      const result = validateJSON(file, content);
      setValidationResult(result);

      if (result.valid && result.warnings.length === 0) {
        setUploadState(UPLOAD_STATES.AUTH_IDLE);
        setStatusMessage('검사 완료. 업로드할 준비가 되었습니다.');
      } else if (result.valid) {
        setUploadState(UPLOAD_STATES.AUTH_IDLE);
        setStatusMessage('경고가 있지만 업로드 가능합니다.');
      } else {
        setUploadState(UPLOAD_STATES.ERROR);
        setStatusMessage('검사 실패. 오류를 수정해주세요.');
      }
    };

    reader.onerror = () => {
      setUploadState(UPLOAD_STATES.ERROR);
      setStatusMessage('파일을 읽을 수 없습니다.');
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!validationResult?.valid || !title.trim()) {
      setStatusMessage('제목을 입력해주세요.');
      return;
    }

    setUploadState(UPLOAD_STATES.UPLOADING);
    setStatusMessage('업로드 중...');
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const jsonContent = e.target.result;

        const postData = {
          title: title.trim(),
          description: description.trim() || null,
          jsonContent: jsonContent,
          fileSize: selectedFile.size
        };

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90));
        }, 100);

        try {
          const response = await fetchWithAuth('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });

          clearInterval(progressInterval);
          setUploadProgress(100);

          if (response.ok) {
            const newPost = await response.json();
            setUploadState(UPLOAD_STATES.PUBLISHED);
            setStatusMessage('업로드 완료! 목록에 추가되었습니다.');

            // 목록에 새 게시글 추가
            setShares(prev => [{
              id: newPost.id,
              title: newPost.title,
              author: newPost.nickname,
              description: newPost.description || '',
              preview: JSON.stringify(JSON.parse(newPost.jsonContent), null, 2).substring(0, 100) + '...',
              date: new Date(newPost.createdAt).toISOString().split('T')[0],
              likes: 0
            }, ...prev]);

            // 폼 초기화
            setSelectedFile(null);
            setValidationResult(null);
            setTitle('');
            setDescription('');
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';

            // 3초 후 idle 상태로
            setTimeout(() => {
              setUploadState(UPLOAD_STATES.AUTH_IDLE);
              setStatusMessage('');
            }, 3000);
          } else {
            clearInterval(progressInterval);
            setUploadState(UPLOAD_STATES.ERROR);
            setStatusMessage('업로드 실패. 다시 시도해주세요.');
          }
        } catch (error) {
          clearInterval(progressInterval);
          setUploadState(UPLOAD_STATES.ERROR);
          setStatusMessage('업로드 실패: ' + error.message);
        }
      };

      reader.onerror = () => {
        setUploadState(UPLOAD_STATES.ERROR);
        setStatusMessage('파일을 읽을 수 없습니다.');
      };

      reader.readAsText(selectedFile);
    } catch (error) {
      setUploadState(UPLOAD_STATES.ERROR);
      setStatusMessage('업로드 실패: ' + error.message);
    }
  };

  const handleLike = (id) => {
    setShares((prevShares) =>
      prevShares.map((share) =>
        share.id === id ? { ...share, likes: share.likes + 1 } : share
      )
    );
  };

  const handleViewList = () => {
    document.getElementById('public-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    window.history.back();
  };

  const checklistStatus = getValidationChecklistStatus(validationResult);

  return (
    <div className="tibu-share">
      <nav className="tibu-share-nav">
        <button className="back-button" onClick={goBack}>
          ← 뒤로가기
        </button>
        <h1>띠부 공유</h1>
      </nav>

      <section className="share-hero">
        <div className="share-hero-content">
          <h1>띠부 공유</h1>
          <p className="share-hero-subtitle">
            다른 사용자들과 유용한 대화를 JSON으로 공유하세요.
          </p>
          {!isAuthenticated && (
            <p className="share-hero-note" aria-live="polite">
              업로드는 로그인 후 이용할 수 있습니다.
            </p>
          )}
        </div>
      </section>

      <section className="upload-section" ref={uploadSectionRef}>
        <div className="upload-container">
          <h2>업로드</h2>
          <p className="upload-description">
            JSON 파일을 업로드하면 검사를 거쳐 목록에 공개됩니다. 민감정보가
            포함되지 않도록 주의해주세요.
          </p>

          {!isAuthenticated ? (
            <div className="upload-banner guest-banner" role="alert">
              <h3>업로드를 시작하려면 로그인이 필요합니다</h3>
              <p>스팸/악성 파일 방지를 위해 로그인 후 업로드를 제공해요.</p>
              <button className="login-prompt-button" onClick={handleLoginClick}>
                로그인하기
              </button>
            </div>
          ) : (
            <>
              <div className="upload-banner auth-banner">
                <h3>JSON 업로드 가이드</h3>
                <p>
                  개인정보가 포함되어 있지 않은지 확인하고, 필수 필드가 있는지
                  점검하세요.
                </p>
              </div>

              <div className="upload-controls">
                <div className="form-fields">
                  <div className="form-field">
                    <label htmlFor="post-title">제목 *</label>
                    <input
                      id="post-title"
                      type="text"
                      placeholder="게시글 제목을 입력하세요"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={200}
                      disabled={uploadState === UPLOAD_STATES.UPLOADING}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="post-description">설명 (선택)</label>
                    <textarea
                      id="post-description"
                      placeholder="게시글에 대한 간단한 설명을 입력하세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={1000}
                      rows={3}
                      disabled={uploadState === UPLOAD_STATES.UPLOADING}
                    />
                  </div>
                </div>

                <div className="file-upload-area">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    disabled={uploadState === UPLOAD_STATES.VALIDATING || uploadState === UPLOAD_STATES.UPLOADING}
                    id="file-upload"
                    aria-disabled={uploadState === UPLOAD_STATES.VALIDATING || uploadState === UPLOAD_STATES.UPLOADING}
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    {selectedFile ? selectedFile.name : 'JSON 파일 선택하기'}
                  </label>
                </div>

                {statusMessage && (
                  <div className="status-message" aria-live="polite">
                    {statusMessage}
                  </div>
                )}

                {uploadState === UPLOAD_STATES.UPLOADING && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </div>

              {validationResult && (
                <div className="validation-results">
                  <h4>검사 결과</h4>
                  <ul className="checklist">
                    <li className={checklistStatus.size}>
                      <span className="icon">{checklistStatus.size === 'success' ? '✓' : '✗'}</span>
                      파일 크기 (≤200KB)
                    </li>
                    <li className={checklistStatus.syntax}>
                      <span className="icon">{checklistStatus.syntax === 'success' ? '✓' : '✗'}</span>
                      JSON 문법
                    </li>
                    <li className={checklistStatus.dangerous}>
                      <span className="icon">{checklistStatus.dangerous === 'success' ? '✓' : '✗'}</span>
                      위험 키 금지 (__proto__, constructor, prototype)
                    </li>
                    <li className={checklistStatus.pii}>
                      <span className="icon">{checklistStatus.pii === 'success' ? '✓' : checklistStatus.pii === 'warning' ? '⚠' : '✗'}</span>
                      민감정보 감지 (이메일/전화 등)
                    </li>
                  </ul>

                  {validationResult.errors.length > 0 && (
                    <div className="validation-errors">
                      <h5>오류</h5>
                      <ul>
                        {validationResult.errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validationResult.warnings.length > 0 && (
                    <div className="validation-warnings">
                      <h5>경고</h5>
                      <ul>
                        {validationResult.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validationResult.valid && (
                    <button
                      className="upload-submit-button"
                      onClick={handleUpload}
                      disabled={uploadState === UPLOAD_STATES.UPLOADING}
                    >
                      {uploadState === UPLOAD_STATES.UPLOADING ? '업로드 중...' : '업로드하기'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="대화 검색"
            />
          </div>

          <div className="share-grid">
            {filteredShares.map((share) => (
              <div key={share.id} className="share-card">
                <div className="share-header">
                  <h3>{share.title}</h3>
                  <span className="share-author">by {share.author}</span>
                </div>
                <p className="share-preview">{share.preview}</p>
                <p className="share-description">{share.description}</p>
                <div className="share-footer">
                  <span className="share-date">{share.date}</span>
                  <div className="share-actions">
                    <button className="action-button view-button">
                      자세히 보기
                    </button>
                    <button
                      className="action-button like-button"
                      onClick={() => handleLike(share.id)}
                      aria-label={`좋아요 ${share.likes}개`}
                    >
                      ❤ {share.likes}
                    </button>
                  </div>
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
      </section>
    </div>
  );
}

export default TibuShare;
