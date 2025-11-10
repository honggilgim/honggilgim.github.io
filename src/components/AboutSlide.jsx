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
          <div className="about-content">
            <p>
              안녕하세요! 개발과 일상에 대한 이야기를 공유하는 블로그입니다.
            </p>
            <p>
              이 블로그는 React와 GitHub Pages를 사용하여 만들어졌습니다.
            </p>
            <h2>기술 스택</h2>
            <ul>
              <li>React</li>
              <li>React Router</li>
              <li>Vite</li>
              <li>GitHub Pages</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSlide

