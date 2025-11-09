import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('메시지가 전송되었습니다!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2>문의하기</h2>
          <p>궁금한 점이 있으시면 언제든지 연락주세요</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>연락처 정보</h3>
            <div className="contact-item">
              <strong>프로젝트:</strong>
              <p>띠부띠부 챗</p>
            </div>
            <div className="contact-item">
              <strong>GitHub:</strong>
              <p>
                <a 
                  href="https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  TTIBU-TTIBU-CHAT-WEB
                </a>
              </p>
            </div>
            <div className="contact-item">
              <strong>응답 시간:</strong>
              <p>24시간 이내</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              메시지 보내기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;