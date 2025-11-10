# Honggilgim Blog

React와 GitHub Pages를 사용하여 만든 개인 블로그입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **React Router** - 라우팅
- **Vite** - 빌드 도구
- **React Markdown** - 마크다운 렌더링
- **GitHub Pages** - 호스팅

## 로컬 개발

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 배포

이 저장소는 GitHub Actions를 통해 자동으로 배포됩니다.

1. `main` 브랜치에 푸시하면 자동으로 빌드 및 배포가 시작됩니다.
2. GitHub 저장소 설정에서 Pages 설정을 확인하세요:
   - Settings > Pages > Source: GitHub Actions

## 프로젝트 구조

```
honggilgim.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 워크플로우
├── public/                      # 정적 파일
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── Layout.jsx         # 레이아웃 컴포넌트
│   │   └── Layout.css
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Home.jsx           # 홈 페이지
│   │   ├── Post.jsx           # 포스트 상세 페이지
│   │   ├── About.jsx          # About 페이지
│   │   └── *.css
│   ├── data/                   # 데이터 파일
│   │   └── posts.js           # 포스트 데이터
│   ├── posts/                  # 마크다운 포스트 파일
│   │   └── *.md               # 마크다운 포스트
│   ├── App.jsx                # 메인 앱 컴포넌트
│   ├── App.css
│   ├── main.jsx               # 엔트리 포인트
│   └── index.css              # 전역 스타일
├── index.html                 # HTML 템플릿
├── package.json
├── vite.config.js             # Vite 설정
└── README.md
```

## 포스트 추가하기

### 방법 1: 마크다운 파일 사용 (권장)

1. `src/posts/` 디렉토리에 마크다운 파일을 생성합니다 (예: `my-post.md`)
2. `src/data/posts.js`에 포스트 정보를 추가합니다:

```javascript
import myPostMd from '../posts/my-post.md?raw'

{
  id: 4,
  title: '마크다운 포스트',
  date: '2025-01-18',
  excerpt: '마크다운으로 작성된 포스트입니다.',
  tags: ['Markdown'],
  markdown: true,
  markdownContent: myPostMd
}
```

### 방법 2: JSX 컴포넌트 사용

`src/data/posts.js` 파일에 새로운 포스트 객체를 추가합니다:

```javascript
{
  id: 3,
  title: '포스트 제목',
  date: '2025-01-17',
  excerpt: '포스트 요약',
  tags: ['태그1', '태그2'],
  markdown: false,
  content: (
    <div>
      <h2>섹션 제목</h2>
      <p>포스트 내용...</p>
    </div>
  )
}
```

### 마크다운 기능

- 일반 마크다운 문법 지원
- GitHub Flavored Markdown (GFM) 지원 (테이블, 체크박스 등)
- 코드 블록 하이라이팅
- 이미지, 링크, 인용문 등 모든 마크다운 요소 지원

## 라이선스

MIT

