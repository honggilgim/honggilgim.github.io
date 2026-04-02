4월 1일 오늘은 만우절이다.

마침 오늘 회사에서 일이 없어 1시간 가량을 투자해 카카오톡 송금 메시지 장난을 만들었는데, 이와 관련해서 공유하고자 한다.

<미리보는 결과물>

![](/images/posts/april-fools-kakao/01.png)

누르면 이렇게 나온다.

![](/images/posts/april-fools-kakao/02.png)

# 1. 카카오톡 템플릿 생성

보통 회사에서는 업체를 통해 카카오톡 템플릿을 생성하고 카카오측에 승인받은 후, 템플릿 코드라는 고유값과 옐로우 ID 라 부르는 채널 고유 코드를 사용해 카카오 템플릿을 발송한다.

하지만 장난을 위해 사업자 등록을 진행하고 카카오톡 템플릿을 만들기에는 일이 너무 크다. 그래서 간단하게 카카오톡 메시지 템플릿을 만들 수 있는 방법이 있는지 찾아봤는데, 있다!

우선, 카카오 디벨로퍼스 (url : https://developers.kakao.com/) 에 들어가 앱을 생성해 주어야 한다.

![](/images/posts/april-fools-kakao/03.png)

카카오 디벨로퍼스의 앱 탭에 들어가 앱 생성 버튼을 누르면 위 화면이 나오는데, 앱 이름과 회사명은 임의로 지어주도록 하자. 하지만, 알아두어야 할 것이 있는데

![](/images/posts/april-fools-kakao/04.png)

저기 빨간 밑줄에 보이는 이름이 앱 이름이다. 장난 칠거면 신경써서 지어주도록 하자.

![](/images/posts/april-fools-kakao/05.png)

들어간 후 앱 대시보드에 들어가면 위처럼 화면이 나타난다. 우리는 다른 설정은 할 필요 없이 오직 만우절용 템플릿만 만들 것이니 만우절 템플릿용에서 필요한 부분만 체크하면 된다.

카카오톡 메시지는 카카오 디벨로퍼스에서도 만들도록 지원을 해주는데

![](/images/posts/april-fools-kakao/06.png)

앱 > 제품 설정 > 카카오톡 메시지 에 들어간 후 메시지 템플릿 빌더를 클릭하면 간단하게 카카오톡 템플릿을 만들 수 있다.

다만,

![](/images/posts/april-fools-kakao/07.png)

위 링크 설정 부분이 중요하다. 이 부분을 넣어주어야 링크를 넣을 수 있다.

![](/images/posts/april-fools-kakao/08.png)

앱 > 앱 설정 > 앱 >제품 링크 관리

안에 들어가면 링크를 넣을 수 있는데, 이 곳에 아무 사이트 혹은 자신이 사용하고자 하는 도메인을 넣어주면 된다.

그 후 링크 설정해주면 된다.

나는 깃허브 블로그를 가진 게 있어서 적은 후, 따로 fake 페이지를 만들어 링크를 연결했다.

# 발송

카카오톡 메시지 템플릿을 만들었다고 해서 발송을 못하면 아무 의미가 없다.

우리는 https://developers.kakao.com/docs/latest/ko/kakaotalk-message/common
에 나오는 카카오톡 메시지 API 를 활용해 메시지를 보낼 건데,

자바스크립트 카카오 SDK를 사용하면 쉽게 만들 수 있다.

SDK : https://developers.kakao.com/docs/latest/ko/javascript/getting-started
카카오 Custom 보내기 관련 문서 : https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html#.sendCustom

이렇게만 보면 정말 어려워보이지만, 장난에 많은 시간을 소요하기는 좀 그러니

![](/images/posts/april-fools-kakao/09.png)

우리는 이 부분에 있는 SDK 값과,

![](/images/posts/april-fools-kakao/10.png)

이곳에 있는 카카오톡 템플릿 id 만 사용하면 된다!

그리고 SDK 를 사용하기 위해

![](/images/posts/april-fools-kakao/11.png)

sdk 키 값을 사용할 수 있도록 하는 도메인을 등록하는 일을 잊지 말자. 이 곳에 등록해주면 된다. 로컬에서 할 경우는 localhost 또는 127.0.0.1 이런 식으로 등록해주면 된다.

```jsx
import { useCallback, useEffect, useState } from 'react'
import './KakaoTemplateShare.css'

const KAKAO_JS_KEY = 'SDK 키 값'
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
      templateId={#카카오톡 템플릿 ID}
      heading="홍길의 만우절 공유"
      description="만우절 카톡 송금하기 버튼 훼이크 공유드립니다~"
    />
  )
}
```

리액트 기준으로 짠 코드다. ~~커서가 짜줬다.~~

sdk 키 값과, 카카오톡 템플릿 ID만 있으면 발송이 가능한데, 장난용으로 만든거니 커서, 지피티, 클로드, 제미나이 등 인공지능에 넣으면 알아서 짜준다. 인공지능을 완벽하게 활용하도록 하자. ~~실제 서비스에서는 조사하고 코딩하자~~
