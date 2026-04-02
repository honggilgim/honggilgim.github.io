import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutSlide from './AboutSlide'
import Sidebar from './Sidebar'
import './Layout.css'

const SIDEBAR_COLLAPSED_KEY = 'honggilgim-sidebar-collapsed'

function Layout({ children }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1'
    } catch {
      return false
    }
  })
  const location = useLocation()

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_KEY,
        desktopSidebarCollapsed ? '1' : '0'
      )
    } catch {
      /* ignore */
    }
  }, [desktopSidebarCollapsed])

  return (
    <div className="layout-root">
      {mobileNavOpen && (
        <button
          type="button"
          className="layout-backdrop"
          aria-label="메뉴 닫기"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <Sidebar
        isMobileOpen={mobileNavOpen}
        desktopCollapsed={desktopSidebarCollapsed}
        onDesktopCollapsedChange={setDesktopSidebarCollapsed}
        onLinkClick={() => setMobileNavOpen(false)}
        onAboutClick={() => setIsAboutOpen(true)}
      />
      <div className="layout-column">
        <header className="layout-topbar">
          <button
            type="button"
            className="layout-burger"
            aria-label="사이드바 열기"
            onClick={() => setMobileNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>
        <main className="layout-main">
          <div className="layout-container">{children}</div>
        </main>
        <footer className="layout-footer">
          <p>
            Copyright © {new Date().getFullYear()} | Hong ·{' '}
            <a
              href="https://github.com/honggilgim/honggilgim.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
      <AboutSlide isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  )
}

export default Layout
