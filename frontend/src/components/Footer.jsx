import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>띠부띠부챗</h3>
            <p>AI 기반 대화 관리 플랫폼</p>
          </div>
          <div className="footer-section">
            <h4>링크</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#docs">Docs</a></li>
              <li><a href="#teams">Teams</a></li>
              <li><a href="#demo">Demo</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>커뮤니티</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/yourusername/ttibu-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 띠부띠부챗. MIT License.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
