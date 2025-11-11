import { useState } from 'react'
import { Link } from 'react-router-dom'
import AboutSlide from './AboutSlide'
import MenuSlide from './MenuSlide'
import './Layout.css'

function Layout({ children }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>Blog</h1>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <button 
              className="nav-about-btn" 
              onClick={() => setIsAboutOpen(true)}
              aria-label="About me"
            >
              About me
            </button>
            <button 
              className="nav-menu-btn" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              목록
            </button>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Hong. All rights reserved.</p>
        </div>
      </footer>
      <AboutSlide isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <MenuSlide 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onAboutClick={() => setIsAboutOpen(true)}
      />
    </div>
  )
}

export default Layout

