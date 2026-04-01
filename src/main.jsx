import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 404.html → /?/… 리다이렉트 후 경로 복원 (인코딩·구버전 index.html 캐시 대비, Router보다 먼저 실행)
;(function fixGhPagesSpaUrl() {
  const l = window.location
  if (!l.search || l.search.length < 2) return
  let q = l.search.slice(1)
  try {
    q = decodeURIComponent(q.replace(/\+/g, ' '))
  } catch {
    return
  }
  if (q.charAt(0) !== '/') return
  const decoded = q
    .split('&')
    .map((s) => s.replace(/~and~/g, '&'))
    .join('?')
  const next = l.pathname.replace(/\/$/, '') + decoded + l.hash
  window.history.replaceState(null, '', next)
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

