import { UPLOAD_STATES } from '../../utils/jsonValidator';

export function UploadSection({
  isAuthenticated,
  uploadState,
  title,
  description,
  selectedFile,
  validationResult,
  checklistStatus,
  statusMessage,
  uploadProgress,
  fileInputRef,
  uploadSectionRef,
  onLoginClick,
  onTitleChange,
  onDescriptionChange,
  onFileSelect,
  onUpload,
}) {
  return (
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
            <button className="login-prompt-button" onClick={onLoginClick}>
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
                    onChange={onTitleChange}
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
                    onChange={onDescriptionChange}
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
                  onChange={onFileSelect}
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
                    onClick={onUpload}
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
  );
}
