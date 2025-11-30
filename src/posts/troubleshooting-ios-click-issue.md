## 문제 상황

iOS에서 웹앱 사이트를 운영중인데, 클릭 이벤트가 먹히지 않는 경우가 있다. 특히 첫 화면에서는 클릭이 정상 작동하지 않고, 두번째 화면으로 넘어가는 순간 클릭 버튼이 정상 작동하는 문제가 발생했다. B2C 웹앱인 만큼 첫 화면의 클릭 문제도 중요했고, 이에 문제 해결을 위해 조사했다.

- 단 한 가지 버튼인 상단 **네비 바 버튼만 클릭 불가**. 나머지는 전부 클릭 가능
- 첫 화면이 아닐 경우 정상 클릭 가능
- 안드로이드의 경우 정상 동작

## 1. 문제 상세

iOS 웹앱 환경에서는 클릭 이벤트가 먹히지 Javascript 클릭 이벤트가 먹히지 않는 상황이 아주 많이 발생한다.

### 1). 300ms 딜레이 + 터치 이벤트 충돌

- iOS는 터치 제스처(더블탭 줌, 스크롤 등)를 고려해서 click 이벤트를 touchstart → touchend → click 순서로 처리
- 그 과정에서 딜레이가 생기거나, touchend에서 preventDefault()를 잘못 쓰면 클릭 이벤트 자체가 막혀버린다.

### 2). 홈화면에 추가한 웹앱 특성

- iOS 홈화면에 추가한 Standalone WebApp 모드는 Safari와 달리 몇 가지 제약이 존재
  - 1. 더블탭 줌/스크롤 동작이 달라서 클릭 이벤트 트리거가 꼬임
  - 2. 일부 제스처(스와이프, 터치)와 이벤트 우선순위 충돌
  - 3. iframe, fixed 요소, transform 속성 위에서의 클릭이 무시되는 사례가 존재한다고 한다.

### 3). CSS 관련 문제

iOS는 특정 CSS 속성 때문에 클릭이 무시되는 경우 존재:

- `cursor: pointer;`가 없으면 요소가 클릭 가능한 대상으로 인식되지 않음
- `z-index`와 `position` 조합이 잘못되면 보이지 않는 다른 레이어가 터치 이벤트를 가로챔
- `pointer-events: none`이 상위 엘리먼트에 걸려있으면 클릭이 전달되지 않는다.

### 4). 이벤트 위임 문제

- `onclick`을 동적으로 추가한 요소에서는 잘 안 먹히는 경우가 존재.
- Safari/iOS WebApp은 동적으로 바뀐 DOM에 `onclick`이 바로 적용되지 않거나 **버블링이 막히는 버그**가 존재한다.

### 5). WKWebView 특성 (앱 내장 웹뷰일 경우)

- iOS 앱에서 WKWebView로 띄운 웹앱이라면:
  - 기본 설정에서 WKWebView의 gesture recognizer가 이벤트를 먹어버릴 수 있음
  - allowsBackForwardNavigationGestures 또는 스크롤 관련 설정 때문에 클릭 전달이 막힌다.

## 2. 해결 방안

우선 나는 앱 개발자가 아닌 웹 개발자이다. 프론트 + 백엔드 모두를 다루지만 앱 부분은 잘 모른다. iOS 쪽은 앱 개발자분이 따로 계시는데.. 그 분이 모른다고만 하신다. 그래서 아래 찾은 내용 공유 및 시도했는데 전부 실패해서 앱 개발자분과 계속 이야기했고, 원인을 찾아 해결했다. 아래는 시도해 본 내용이다.

### 2-1. viewport 설정으로 300ms 딜레이 제거

더블탭 줌 설정으로 생기는 문제를 클릭 이벤트 누락을 방지해준다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

**실패**

### 2-2. 클릭 대신 `touchend` / `pointerup` 이벤트 사용

iOS에서는 `click`이 늦게 오거나 아예 안 올 수 있으므로 `touchend` 또는 `pointerup` 이벤트를 쓰는 게 좋다고 한다.

```js
const btn = document.querySelector('#myBtn');

// touchend
btn.addEventListener('touchend', function(e) {
    // 동작
});

// pointer
btn.addEventListener('pointerup', () => {
  // 동작
});
```

**실패**

### 2-3. CSS에서 클릭 가능한 요소로 지정

여러 사이트 및 다양한 곳에서 알려준 방식이다. iOS는 버튼/링크가 아닌 요소에 `cursor: pointer;`가 없으면 클릭 이벤트가 무시되어 이런 문제가 생기는 경우는 cursor에 pointer 속성을 추가해 이벤트를 넣는다고 한다.

```css
cursor: pointer;
```

**실패**

### 2-4. 이벤트 위임 방식 사용 (동적 요소 대응)

동적으로 DOM이 바뀌는 경우 `onclick` 대신 이벤트 위임을 써야 안정적으로 동작이 가능하다고 한다.

```js
document.addEventListener('click', function(e) {
  if (e.target.matches('#myBtn')) {
    // 동작
  }
});
```

**실패**

### 2-5. WKWebView에서 막힐 때

사파리에서는 동작하고, 웹앱에서는 동작하지 않았기에 믿음을 가지고 시도했다.

- WKWebView 사파리

```swift
webView.allowsBackForwardNavigationGestures = false
```

- 버튼 쪽 body

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}
```

**실패**

## 3. 해결 방안

테스트 앱에 버튼이 클릭될 때마다 alert을 띄우는 코드를 추가했다. 그렇게 해 보니 갑자기 또 정상 작동되어서 console.log를 띄워보니, 첫 화면의 nav 버튼만 중복 클릭되는 문제를 확인했다.

**원인:**

> iOS에서 touchend → click이 연속으로 발생해서 생기는 전형적인 이슈

찾아보니 다른 사람들도 많이 겪은 문제였다.

### 4. 해결 코드

iOS 중복 버튼 클릭 방지 특정 버튼 코드에 넣어준다.

```js
let isClicked = false;

document.querySelector('#myBtn').addEventListener('click', function(e) {
  if (isClicked) return; // 이미 눌렸으면 무시
  isClicked = true;

  // 동작

  // 1초 뒤 다시 클릭 가능
  setTimeout(() => {
    isClicked = false;
  }, 1000);
});
```

**성공**

네비 바 버튼에 해당 코드를 추가해 버튼이 중복 클릭되는 현상을 방지했고 결국 성공했다.

## 번외. 웹앱 환경 상 js, css 안먹을때

위의 상황 같이 문제가 발생했을 때는 검증 서버에 반영을 해야 문제가 확인된다. 하지만, iOS 웹앱은 캐시를 저장해두어 앱을 구동하기 때문에 js 파일 혹은 css 파일을 변경해서 바뀐 파일을 올린다고 앱에 바뀐 코드가 적용되지 않는다. 정적 리소스의 경우는 캐싱을 통해 앱이 가지고 있기 때문인데, 이를 방지하기 위한 방법이다.

### ver 코드

```html
<script src="/js/app.js?ver=1.2.3"></script>
```

`?ver=` 이 코드는 파일 버전을 표시하는 쿼리 파라미터이다.

브라우저는 `/js/app.js`와 `/js/app.js?ver=1.2.3`을 서로 다른 URL로 인식하여 캐시가 저장되어 있어도 다시 로드한다.

**저 부분을 변경해주지 않으면 변경된 코드가 적용되지 않으니 이 점 유의해야 한다.**

