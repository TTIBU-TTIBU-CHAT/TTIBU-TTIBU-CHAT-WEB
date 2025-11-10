import { useState, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import Docs from './components/Docs'
import Teams from './components/Teams'
import Demo from './components/Demo'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TibuShare from './pages/TibuShare'
import Login from './pages/Login'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/tibu-share' || path.startsWith('/tibu-share')) {
        setCurrentPage('tibu-share')
      } else if (path === '/login' || path.startsWith('/login')) {
        setCurrentPage('login')
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

  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Docs />
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
