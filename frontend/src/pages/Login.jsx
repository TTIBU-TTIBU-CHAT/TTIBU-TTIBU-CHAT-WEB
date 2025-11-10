import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

function Login() {
  const { login, signup, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || '/';
      window.history.pushState({}, '', redirect);
      window.dispatchEvent(new Event('popstate'));
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.id || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    const result = await login({
      username: formData.id,
      password: formData.password
    });

    if (!result.success) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.id || !formData.password || !formData.nickname) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.id.length < 4) {
      setError('아이디는 4자 이상이어야 합니다.');
      return;
    }

    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    const result = await signup({
      username: formData.id,
      password: formData.password,
      nickname: formData.nickname
    });

    if (!result.success) {
      setError('회원가입에 실패했습니다. 이미 존재하는 아이디일 수 있습니다.');
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormData({ id: '', password: '', nickname: '' });
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-button-login" onClick={goBack}>
          ← 뒤로가기
        </button>

        <div className="login-card">
          <h1 className="login-title">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h1>
          <p className="login-subtitle">
            띠부띠부챗에 {mode === 'login' ? '로그인' : '가입'}하여 대화를 공유하세요
          </p>

          <form
            className="auth-form"
            onSubmit={mode === 'login' ? handleLogin : handleSignup}
          >
            <div className="form-group">
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력하세요"
                  autoComplete="nickname"
                />
              </div>
            )}

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="submit-button">
              {mode === 'login' ? '로그인' : '회원가입'}
            </button>
          </form>

          <div className="mode-toggle">
            <p>
              {mode === 'login'
                ? '계정이 없으신가요?'
                : '이미 계정이 있으신가요?'}
              <button
                type="button"
                className="toggle-button"
                onClick={toggleMode}
              >
                {mode === 'login' ? '회원가입' : '로그인'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
