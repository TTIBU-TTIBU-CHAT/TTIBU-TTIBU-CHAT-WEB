import { useState } from 'react'

function App() {
  // Reset body styles
  if (typeof document !== 'undefined') {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.documentElement.style.margin = '0'
    document.documentElement.style.padding = '0'
  }
  
  const [theme, setTheme] = useState('white')
  
  const themes = {
    white: {
      bg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#6b7280',
      accent: '#2563eb',
      border: '#e5e7eb'
    },
    blue: {
      bg: '#0b1220',
      text: '#e2e8f0',
      textSecondary: '#94a3b8',
      accent: '#60a5fa',
      border: '#334155'
    }
  }
  
  const currentTheme = themes[theme]
  
  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'blue' : 'white')
  }
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        backgroundColor: currentTheme.bg,
        borderBottom: `1px solid ${currentTheme.border}`,
        padding: '1rem 0',
        zIndex: 1000
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: currentTheme.accent }}>
            띠부띠부 챗
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => scrollToSection('features')} style={{
              background: 'none', border: 'none', color: currentTheme.text, cursor: 'pointer', padding: '0.5rem 1rem'
            }}>Features</button>
            <button onClick={() => scrollToSection('docs')} style={{
              background: 'none', border: 'none', color: currentTheme.text, cursor: 'pointer', padding: '0.5rem 1rem'
            }}>Docs</button>
            <button onClick={() => scrollToSection('teams')} style={{
              background: 'none', border: 'none', color: currentTheme.text, cursor: 'pointer', padding: '0.5rem 1rem'
            }}>Teams</button>
            <button onClick={() => scrollToSection('contact')} style={{
              background: 'none', border: 'none', color: currentTheme.text, cursor: 'pointer', padding: '0.5rem 1rem'
            }}>Contact</button>
            <button onClick={() => scrollToSection('docs')} style={{
              background: currentTheme.accent, color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer'
            }}>Get Started</button>
            <button onClick={toggleTheme} style={{
              background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
            }}>
              {theme === 'white' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: currentTheme.accent
        }}>
          띠부띠부 챗
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: currentTheme.textSecondary,
          marginBottom: '1rem',
          fontWeight: '500'
        }}>
          GPT 대화 내용을 그룹화하고 조합해서 효율적으로 관리하는 AI 챗봇 서비스
        </p>
        <p style={{
          fontSize: '1.125rem',
          color: currentTheme.textSecondary,
          marginBottom: '3rem',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          대화를 주제별로 분류하고, 그룹들을 선택적으로 조합하여 더욱 스마트한 AI 대화 경험을 만들어보세요.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => scrollToSection('docs')} style={{
            background: currentTheme.accent,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
          <button onClick={() => window.open('https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB', '_blank')} style={{
            background: 'transparent',
            color: currentTheme.text,
            border: `2px solid ${currentTheme.accent}`,
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View on GitHub
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '6rem 2rem',
        backgroundColor: theme === 'white' ? '#f9fafb' : '#0f172a'
      }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>주요 기능</h2>
            <p style={{ fontSize: '1.25rem', color: currentTheme.textSecondary }}>
              띠부띠부 챗이 제공하는 강력한 기능들을 확인해보세요
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { title: "띠부 그룹화", desc: "GPT 대화 내용을 주제별로 그룹화하여 체계적으로 관리합니다." },
              { title: "띠부 요약", desc: "긴 대화 내용을 간결하게 요약하여 핵심 정보를 빠르게 파악할 수 있습니다." },
              { title: "실시간 채팅", desc: "AI와 실시간으로 대화하며 즉각적인 응답을 받을 수 있습니다." },
              { title: "버전 관리", desc: "대화 버전을 체계적으로 관리하고 추적할 수 있습니다." },
              { title: "그룹 조합", desc: "그룹화된 대화들을 선택하여 조합하고 새로운 대화를 시작할 수 있습니다." },
              { title: "안전한 키 관리", desc: "API 키와 중요한 정보를 안전하게 관리하고 보호합니다." }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: currentTheme.bg,
                padding: '2.5rem',
                borderRadius: '1rem',
                border: `1px solid ${currentTheme.border}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🚀</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: currentTheme.textSecondary, lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs Section */}
      <section id="docs" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>문서</h2>
          <p style={{ fontSize: '1.25rem', color: currentTheme.textSecondary, marginBottom: '4rem' }}>
            띠부띠부 챗을 사용하기 위한 문서와 가이드
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { title: "빠른 시작 가이드", desc: "띠부띠부 챗을 시작하는 가장 빠른 방법을 안내합니다." },
              { title: "API 문서", desc: "개발자를 위한 상세한 API 문서와 예제를 확인하세요." },
              { title: "사용자 가이드", desc: "띠부띠부 챗의 모든 기능을 활용하는 방법을 알아보세요." }
            ].map((doc, index) => (
              <div key={index} style={{
                backgroundColor: currentTheme.bg,
                padding: '2.5rem',
                borderRadius: '1rem',
                border: `1px solid ${currentTheme.border}`
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {doc.title}
                </h3>
                <p style={{ color: currentTheme.textSecondary, marginBottom: '2rem' }}>
                  {doc.desc}
                </p>
                <button style={{
                  background: currentTheme.accent,
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  {index === 0 ? '시작하기' : index === 1 ? 'API 문서 보기' : '가이드 보기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" style={{
        padding: '6rem 2rem',
        backgroundColor: theme === 'white' ? '#f9fafb' : '#0f172a'
      }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>팀 소개</h2>
            <p style={{ fontSize: '1.25rem', color: currentTheme.textSecondary }}>
              띠부띠부 챗을 만들어가는 팀원들을 소개합니다
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { name: "문연호", role: "Frontend Developer", desc: "React와 사용자 경험에 집중하는 프론트엔드 개발자" },
              { name: "개발팀", role: "Backend Developer", desc: "AI 서비스와 API 개발을 담당하는 백엔드 개발자" },
              { name: "기획팀", role: "Product Manager", desc: "사용자 요구사항과 제품 방향성을 담당하는 기획자" },
              { name: "디자인팀", role: "UI/UX Designer", desc: "사용자 인터페이스와 경험 디자인을 담당하는 디자이너" }
            ].map((member, index) => (
              <div key={index} style={{
                backgroundColor: currentTheme.bg,
                padding: '2.5rem',
                borderRadius: '1rem',
                border: `1px solid ${currentTheme.border}`,
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: currentTheme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {member.name}
                </h3>
                <p style={{ color: currentTheme.accent, fontWeight: '500', marginBottom: '1rem' }}>
                  {member.role}
                </p>
                <p style={{ color: currentTheme.textSecondary, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {member.desc}
                </p>
                <a 
                  href="https://github.com/mun-yeongho" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: currentTheme.accent,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '500'
                  }}
                >
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 2rem' }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>문의하기</h2>
            <p style={{ fontSize: '1.25rem', color: currentTheme.textSecondary }}>
              궁금한 점이 있으시면 언제든지 연락주세요
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>연락처 정보</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>프로젝트:</strong>
                <p style={{ color: currentTheme.textSecondary, margin: 0 }}>띠부띠부 챗</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>GitHub:</strong>
                <a 
                  href="https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: currentTheme.accent, textDecoration: 'none' }}
                >
                  TTIBU-TTIBU-CHAT-WEB
                </a>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>응답 시간:</strong>
                <p style={{ color: currentTheme.textSecondary, margin: 0 }}>24시간 이내</p>
              </div>
            </div>
            
            <div style={{
              backgroundColor: currentTheme.bg,
              padding: '2.5rem',
              borderRadius: '1rem',
              border: `1px solid ${currentTheme.border}`
            }}>
              <form onSubmit={(e) => { e.preventDefault(); alert('메시지가 전송되었습니다!') }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>이름</label>
                  <input 
                    type="text" 
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '0.5rem',
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.text,
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>이메일</label>
                  <input 
                    type="email" 
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '0.5rem',
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.text,
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>메시지</label>
                  <textarea 
                    rows="5" 
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '0.5rem',
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.text,
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  style={{
                    background: currentTheme.accent,
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  메시지 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: theme === 'white' ? '#f3f4f6' : '#020617',
        padding: '4rem 2rem 2rem',
        borderTop: `1px solid ${currentTheme.border}`
      }}>
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ color: currentTheme.accent, fontSize: '1.5rem', marginBottom: '1rem' }}>
                띠부띠부 챗
              </h3>
              <p style={{ color: currentTheme.textSecondary, lineHeight: '1.6' }}>
                GPT 대화를 효율적으로 관리하는 AI 챗봇 서비스
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>링크</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => scrollToSection('features')} style={{
                  background: 'none', border: 'none', color: currentTheme.textSecondary, cursor: 'pointer', textAlign: 'left', padding: 0
                }}>기능</button>
                <button onClick={() => scrollToSection('docs')} style={{
                  background: 'none', border: 'none', color: currentTheme.textSecondary, cursor: 'pointer', textAlign: 'left', padding: 0
                }}>문서</button>
                <button onClick={() => scrollToSection('teams')} style={{
                  background: 'none', border: 'none', color: currentTheme.textSecondary, cursor: 'pointer', textAlign: 'left', padding: 0
                }}>팀</button>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>개발</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a 
                  href="https://github.com/mun-yeongho/TTIBU-TTIBU-CHAT-WEB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: currentTheme.textSecondary, textDecoration: 'none' }}
                >
                  GitHub
                </a>
                <button onClick={() => scrollToSection('contact')} style={{
                  background: 'none', border: 'none', color: currentTheme.textSecondary, cursor: 'pointer', textAlign: 'left', padding: 0
                }}>문의하기</button>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: `1px solid ${currentTheme.border}`,
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            color: currentTheme.textSecondary
          }}>
            <p style={{ margin: 0 }}>© 2024 띠부띠부 챗. All rights reserved.</p>
            <p style={{ margin: 0 }}>MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App