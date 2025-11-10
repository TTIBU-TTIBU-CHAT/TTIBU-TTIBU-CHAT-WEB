import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateJSON, getValidationChecklistStatus, UPLOAD_STATES } from '../utils/jsonValidator';
import { ShareNav } from '../components/TibuShare/ShareNav';
import { ShareHero } from '../components/TibuShare/ShareHero';
import { UploadSection } from '../components/TibuShare/UploadSection';
import { PostList } from '../components/TibuShare/PostList';
import { PostDetailModal } from '../components/TibuShare/PostDetailModal';
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
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleViewDetail = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const post = await response.json();
        setSelectedPost(post);
      }
    } catch (error) {
      console.error('게시글 상세 정보 로딩 실패:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const goBack = () => {
    window.history.back();
  };

  const checklistStatus = getValidationChecklistStatus(validationResult);

  return (
    <div className="tibu-share">
      <ShareNav onBack={goBack} />

      <ShareHero isAuthenticated={isAuthenticated} />

      <UploadSection
        isAuthenticated={isAuthenticated}
        uploadState={uploadState}
        title={title}
        description={description}
        selectedFile={selectedFile}
        validationResult={validationResult}
        checklistStatus={checklistStatus}
        statusMessage={statusMessage}
        uploadProgress={uploadProgress}
        fileInputRef={fileInputRef}
        uploadSectionRef={uploadSectionRef}
        onLoginClick={handleLoginClick}
        onTitleChange={(e) => setTitle(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onFileSelect={handleFileSelect}
        onUpload={handleUpload}
      />

      <PostList
        posts={filteredShares}
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        onLike={handleLike}
        onViewDetail={handleViewDetail}
      />

      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default TibuShare;
