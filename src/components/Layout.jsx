import { useState } from 'react'
import { Link } from 'react-router-dom'
import AboutSlide from './AboutSlide'
import './Layout.css'

function Layout({ children }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>Honggilgim Blog</h1>
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
          <p>&copy; 2025 Honggilgim Blog. All rights reserved.</p>
        </div>
      </footer>
      <AboutSlide isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  )
}

export default Layout

