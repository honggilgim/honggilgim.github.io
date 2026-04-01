import { useCallback, useEffect, useState } from 'react'
import './KakaoTemplateShare.css'

const KAKAO_JS_KEY = '7e088b2b260058e76290d8df94382022'
const SDK_SRC = 'https://developers.kakao.com/sdk/js/kakao.js'

function loadKakaoSdk() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('no window'))
      return
    }
    if (window.Kakao) {
      resolve(window.Kakao)
      return
    }
    const existing = document.querySelector(`script[src="${SDK_SRC}"]`)
    if (existing) {
      if (window.Kakao) {
        resolve(window.Kakao)
        return
      }
      existing.addEventListener('load', () => resolve(window.Kakao))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = SDK_SRC
    script.async = true
    script.onload = () => resolve(window.Kakao)
    script.onerror = () => reject(new Error('Kakao SDK load failed'))
    document.head.appendChild(script)
  })
}

export function KakaoTemplateShare({ templateId, heading, description }) {
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadKakaoSdk()
      .then((Kakao) => {
        if (cancelled || !Kakao) return
        if (!Kakao.isInitialized()) {
          Kakao.init(KAKAO_JS_KEY)
        }
        setReady(true)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sendMessage = useCallback(() => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return
    window.Kakao.Link.sendCustom({
      templateId,
    })
  }, [templateId])

  return (
    <div className="kakao-template-share">
      <h2>{heading}</h2>
      <p>{description}</p>
      {loadError && (
        <p className="kakao-template-share__err">
          카카오 SDK를 불러오지 못했습니다. 네트워크와 브라우저 설정을 확인해 주세요.
        </p>
      )}
      <button
        type="button"
        className="kakao-template-share__btn"
        onClick={sendMessage}
        disabled={!ready}
      >
        {ready ? '카카오톡으로 공유하기' : '불러오는 중…'}
      </button>
    </div>
  )
}

export function KakaoAprilFoolShare() {
  return (
    <KakaoTemplateShare
      templateId={131294}
      heading="홍길의 만우절 공유"
      description="만우절 카톡 송금하기 버튼 훼이크 공유드립니다~"
    />
  )
}

export function KakaoLoveMessageShare() {
  return (
    <KakaoTemplateShare
      templateId={131301}
      heading="사랑 메시지 공유"
      description="카카오톡 커스텀 메시지 템플릿으로 마음을 전해 보세요."
    />
  )
}
