import { useMemo, useState, useEffect } from 'react'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { posts } from '../data/posts.jsx'
import { buildNavFromPosts } from '../utils/buildNavTree'
import { SITE_TITLE, SITE_REPO } from '../config/site'
import { decodeSeriesParam } from '../utils/categoryPath'
import './Sidebar.css'

function Sidebar({
  onLinkClick,
  onAboutClick,
  isMobileOpen,
  desktopCollapsed = false,
  onDesktopCollapsedChange,
  className = '',
}) {
  const location = useLocation()
  const categoryMatch = matchPath(
    { path: '/category/:seriesName', end: true },
    location.pathname
  )
  const activeCategorySeries = categoryMatch?.params?.seriesName
    ? decodeSeriesParam(categoryMatch.params.seriesName)
    : null
  const { seriesList, uncategorized } = useMemo(
    () => buildNavFromPosts(posts),
    []
  )

  const [expanded, setExpanded] = useState(() => {
    const init = {}
    seriesList.forEach(([name]) => {
      init[name] = true
    })
    if (uncategorized.length) init.__other__ = true
    return init
  })

  const postMatch = location.pathname.match(/^\/post\/(\d+)/)
  const activePostId = postMatch ? parseInt(postMatch[1], 10) : null
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (isMobileOpen) document.body.classList.add('sidebar-drawer-open')
    else document.body.classList.remove('sidebar-drawer-open')
    return () => document.body.classList.remove('sidebar-drawer-open')
  }, [isMobileOpen])

  const toggleSeries = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAbout = () => {
    onAboutClick?.()
  }

  const navCls = [
    'sidebar',
    className,
    isMobileOpen ? 'sidebar--open' : '',
    desktopCollapsed ? 'sidebar--collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={navCls} aria-label="사이트 내비게이션">
      <div className="sidebar-collapsed-strip">
        <button
          type="button"
          className="sidebar-collapsed-strip__btn"
          aria-label="사이드바 펼치기"
          onClick={() => onDesktopCollapsedChange?.(false)}
        >
          »
        </button>
      </div>
      <div className="sidebar-inner">
        <div className="sidebar-mobile-header">
          <span className="sidebar-mobile-header__title">메뉴</span>
          <button
            type="button"
            className="sidebar-mobile-close"
            aria-label="메뉴 닫기"
            onClick={onLinkClick}
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <button
          type="button"
          className="sidebar-desktop-collapse"
          aria-label="사이드바 접기"
          onClick={() => onDesktopCollapsedChange?.(true)}
        >
          ‹
        </button>
        <Link to="/" className="sidebar-brand" onClick={onLinkClick}>
          <span className="sidebar-brand__title">{SITE_TITLE}</span>
          <span className="sidebar-brand__sub">homepage</span>
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav__root">
            <li>
              <Link
                to="/"
                className={`sidebar-link ${isHome ? 'is-active' : ''}`}
                onClick={onLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="sidebar-link sidebar-link--btn"
                onClick={handleAbout}
              >
                About me
              </button>
            </li>
          </ul>

          {seriesList.map(([seriesName, seriesPosts]) => (
            <div key={seriesName} className="sidebar-group">
              <button
                type="button"
                className={`sidebar-group__head${
                  activeCategorySeries === seriesName ? ' is-active' : ''
                }`}
                onClick={() => toggleSeries(seriesName)}
                aria-expanded={expanded[seriesName]}
              >
                <span
                  className={`sidebar-chevron ${expanded[seriesName] ? 'is-open' : ''}`}
                  aria-hidden
                />
                {seriesName}
              </button>
              {expanded[seriesName] && (
                <ul className="sidebar-group__list">
                  {seriesPosts.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/post/${p.id}`}
                        className={`sidebar-sublink ${
                          activePostId === p.id ? 'is-active' : ''
                        }`}
                        onClick={onLinkClick}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {uncategorized.length > 0 && (
            <div className="sidebar-group">
              <button
                type="button"
                className="sidebar-group__head"
                onClick={() => toggleSeries('__other__')}
                aria-expanded={expanded.__other__}
              >
                <span
                  className={`sidebar-chevron ${expanded.__other__ ? 'is-open' : ''}`}
                  aria-hidden
                />
                기타 글
              </button>
              {expanded.__other__ && (
                <ul className="sidebar-group__list">
                  {uncategorized.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/post/${p.id}`}
                        className={`sidebar-sublink ${
                          activePostId === p.id ? 'is-active' : ''
                        }`}
                        onClick={onLinkClick}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </nav>

        <div className="sidebar-contact">
          <p className="sidebar-contact__label">Contact</p>
          <a
            href={SITE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-contact__link"
          >
            GitHub
          </a>
        </div>

        <p className="sidebar-copy">
          © {new Date().getFullYear()} Hong ·{' '}
          <a href={SITE_REPO}>source</a>
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
