import { useEffect } from 'react'
import './AboutSlide.css'

function AboutSlide({ isOpen, onClose }) {
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

  if (!isOpen) return null

  return (
    <>
      <div className="about-overlay" onClick={onClose}></div>
      <div className="about-slide">
        <button className="about-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="about-slide-content">
          <h1>About me</h1>
          <div className="about-profile">
            <div className="profile-image-container">
              <img 
                src="/profile.jpg" 
                alt="프로필 사진" 
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="profile-image-placeholder" style={{display: 'none'}}>
                <span>프로필 사진</span>
              </div>
            </div>
            <div className="profile-info">
              <p className="profile-intro">자바 스프링 개발자</p>
              <div className="profile-stack">
                <h3>메인 스택</h3>
                <ul>
                  <li>자바 스프링</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSlide

