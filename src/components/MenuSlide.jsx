import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts.jsx'
import { formatDate } from '../utils/dateFormatter'
import './MenuSlide.css'

function MenuSlide({ isOpen, onClose, onAboutClick }) {
  const [expandedSeries, setExpandedSeries] = useState({})
  const [isAllPostsExpanded, setIsAllPostsExpanded] = useState(false)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // 작성일 기준 최신순으로 정렬된 포스트
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // 내림차순 (최신이 먼저)
  })

  // 시리즈별로 그룹화
  const seriesMap = {}
  const postsWithoutSeries = []

  sortedPosts.forEach(post => {
    if (post.series) {
      if (!seriesMap[post.series]) {
        seriesMap[post.series] = []
      }
      seriesMap[post.series].push(post)
    } else {
      postsWithoutSeries.push(post)
    }
  })

  const handlePostClick = () => {
    onClose()
  }

  const handleAboutClick = () => {
    onClose()
    onAboutClick()
  }

  const toggleSeries = (seriesName) => {
    setExpandedSeries(prev => ({
      ...prev,
      [seriesName]: !prev[seriesName]
    }))
  }

  const toggleAllPosts = () => {
    setIsAllPostsExpanded(prev => !prev)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="menu-overlay" onClick={onClose}></div>
      <div className="menu-slide">
        <button className="menu-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="menu-slide-content">
          <h1>목록</h1>
          
          {/* About me 버튼 */}
          <div className="menu-section">
            <button className="menu-about-btn" onClick={handleAboutClick}>
              <span className="menu-icon">👤</span>
              <span>About me</span>
            </button>
          </div>

          {/* 시리즈별 글 목록 */}
          {Object.keys(seriesMap).length > 0 && (
            <div className="menu-section">
              <h2>시리즈</h2>
              {Object.entries(seriesMap).map(([seriesName, seriesPosts]) => (
                <div key={seriesName} className="series-group">
                  <div className="series-header">
                    <h3 className="series-title">{seriesName}</h3>
                    <button 
                      className={`series-toggle-btn ${expandedSeries[seriesName] ? 'expanded' : ''}`}
                      onClick={() => toggleSeries(seriesName)}
                      aria-label={`${seriesName} 시리즈 ${expandedSeries[seriesName] ? '접기' : '펼치기'}`}
                    >
                      <span className="chevron-icon"></span>
                    </button>
                  </div>
                  <div className={`series-content ${expandedSeries[seriesName] ? 'expanded' : ''}`}>
                    <ul className="menu-post-list">
                      {seriesPosts.map(post => (
                        <li key={post.id}>
                          <Link 
                            to={`/post/${post.id}`} 
                            onClick={handlePostClick}
                            className="menu-post-link"
                          >
                            <div className="menu-post-info">
                              <span className="menu-post-title">{post.title}</span>
                              <span className="menu-post-date">{formatDate(post.date)}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 전체 글 목록 */}
          <div className="menu-section">
            <div className="section-header">
              <h2>전체 글</h2>
              <button 
                className={`section-toggle-btn ${isAllPostsExpanded ? 'expanded' : ''}`}
                onClick={toggleAllPosts}
                aria-label={`전체 글 ${isAllPostsExpanded ? '접기' : '펼치기'}`}
              >
                <span className="chevron-icon"></span>
              </button>
            </div>
            <div className={`all-posts-content ${isAllPostsExpanded ? 'expanded' : ''}`}>
              <ul className="menu-post-list">
                {sortedPosts.map(post => (
                  <li key={post.id}>
                    <Link 
                      to={`/post/${post.id}`} 
                      onClick={handlePostClick}
                      className="menu-post-link"
                    >
                      <div className="menu-post-info">
                        <span className="menu-post-title">{post.title}</span>
                        <span className="menu-post-date">{formatDate(post.date)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuSlide

