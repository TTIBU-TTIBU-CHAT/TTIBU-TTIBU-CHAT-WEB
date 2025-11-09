import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>띠부띠부 챗</h3>
            <p>GPT 대화를 효율적으로 관리하는 AI 챗봇 서비스</p>
          </div>
          
          <div className="footer-section">
            <h4>링크</h4>
            <ul>
              <li><a href="#features">기능</a></li>
              <li><a href="#docs">문서</a></li>
              <li><a href="#teams">팀</a></li>
              <li><a href="#demo">데모</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>개발</h4>
            <ul>
              <li>
                <a 
                  href="https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li><a href="#contact">문의하기</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>소셜</h4>
            <div className="social-links">
              <a 
                href="https://github.com/mun-yeongho" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 띠부띠부 챗. All rights reserved.</p>
          <p>MIT License</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;