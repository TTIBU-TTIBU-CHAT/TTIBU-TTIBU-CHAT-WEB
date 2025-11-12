import { useState, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import DocsSection from './components/Docs'
import Teams from './components/Teams'
import Demo from './components/Demo'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TibuShare from './pages/TibuShare'
import Login from './pages/Login'
import Docs from './pages/Docs'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/tibu-share' || path.startsWith('/tibu-share')) {
        setCurrentPage('tibu-share')
      } else if (path === '/login' || path.startsWith('/login')) {
        setCurrentPage('login')
      } else if (path === '/docs' || path.startsWith('/docs')) {
        setCurrentPage('docs')
      } else {
        setCurrentPage('home')
      }
    }

    handleNavigation()

    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  useEffect(() => {
    const originalPushState = window.history.pushState
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args)
      window.dispatchEvent(new Event('popstate'))
    }
  }, [])

  if (currentPage === 'login') {
    return <Login />
  }

  if (currentPage === 'tibu-share') {
    return <TibuShare />
  }

  if (currentPage === 'docs') {
    return <Docs />
  }

  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Teams />
        <Demo />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
