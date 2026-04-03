# Honggil blog

React(Vite) 기반 정적 블로그입니다. 빌드 산출물은 **GitHub Actions**로 `main`에 푸시될 때 자동 생성·배포되며, **GitHub Pages**에서 호스팅됩니다.

**사이트:** [https://honggilgim.github.io/](https://honggilgim.github.io/)

---

## 기술 스택

| 구분 | 사용 |
|------|------|
| UI | **React 18**, **React Router 6** (클라이언트 라우팅, SPA) |
| 빌드 | **Vite 5** (`@vitejs/plugin-react`) |
| 본문 | **react-markdown**, **remark-gfm** (GFM), **rehype-highlight** + **highlight.js** (`github` 테마) |
| 댓글 | **[@giscus/react](https://github.com/giscus/giscus)** (GitHub Discussions) |
| 호스팅 | **GitHub Pages** (Artifact 업로드 → `deploy-pages`) |

`package.json`의 `canvas`는 현재 `src/`에서 import되지 않습니다(정리 시 제거 후보).

---

## GitHub에 올라가는 것

- **소스:** 이 저장소 `main` 브랜치의 `src/`, `public/`, 설정 파일 등.
- **배포물:** Actions가 `npm run build`로 만든 **`dist/`** 전체가 Pages 아티팩트로 업로드되어 공개 사이트에 반영됩니다.  
  로컬에서 `dist/`를 직접 커밋할 필요는 없습니다.
- **SPA 보조:** `public/404.html` 등으로 깃허브 Pages에서 직접 URL 진입 시 라우트 복원(rafgraph/spa-github-pages 방식)을 사용합니다.

저장소 **Settings → Pages**에서 소스가 **GitHub Actions**로 되어 있어야 위 워크플로 배포와 일치합니다.

---

## 배포 워크플로 (`Deploy to GitHub Pages`)

파일: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

| 항목 | 내용 |
|------|------|
| 이름 | `Deploy to GitHub Pages` |
| 트리거 | `main` 푸시 시 아래 경로가 변경된 경우에만 + **수동** `workflow_dispatch` |
| 감시 경로 | `src/**`, `public/**`, `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.github/workflows/deploy.yml` |
| 러너 | `ubuntu-latest`, **Node.js 18**, `npm ci` → `npm run build` |
| 검증 | `dist/index.html` 존재, `dist`에 `.jsx` 없음·번들 `.js` 존재 등(스크립트 단계) |
| 배포 | `configure-pages` → `upload-pages-artifact`(`path: ./dist`) → `deploy-pages@v4` |

`paths` 필터에 걸리지 않는 파일만 바꾼 커밋은 워크플로가 돌지 않습니다. README만 수정한 경우 등에 해당합니다.

---

## 로컬 개발

- **요구:** Node.js **18+**, npm

```bash
npm install
npm run dev      # 개발 서버 (기본 http://localhost:5173)
npm run build    # dist 생성
npm run preview  # dist 미리보기
```

---

## 프로젝트 구조 (요약)

```
honggilgim.github.io/
├── .github/workflows/deploy.yml   # Pages 배포
├── public/                         # 정적 자산 (404.html, 썸네일 등) → dist 루트로 복사
├── src/
│   ├── components/                 # Layout, Sidebar, AboutSlide, GiscusComments, KakaoTemplateShare 등
│   ├── config/                     # site.js, giscus.js
│   ├── data/posts.jsx              # 포스트 메타 + 마크다운(raw) 연결
│   ├── pages/                      # Home, Post, Category, Fake, Love, About(파일 존재 시)
│   ├── posts/*.md                  # 마크다운 본문
│   ├── utils/                      # buildNavTree, categoryPath, dateFormatter
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js                  # base: '/', outDir: dist, 번들 파일명 규칙
├── package.json
└── README.md
```

### 라우팅 개요

- `/` — 홈(글 목록, 페이지네이션)
- `/post/:id` — 글 상세(마크다운/JSX 본문, Giscus)
- `/category/:seriesName` — 시리즈(카테고리)별 글 목록
- `/fake`, `/love` — Layout 밖 별도 페이지

사이드바는 `buildNavTree`로 `posts`의 `series` 필드를 묶어 표시합니다.

---

## 포스트 추가하기

1. `src/posts/`에 `.md` 파일을 추가합니다.
2. `src/data/posts.jsx`에서 해당 파일을 `?raw`로 import하고, 객체에 `id`, `title`, `date`, `excerpt`, `tags`, `series`(선택), `thumbnail`(선택), `markdown: true`, `markdownContent` 등을 넣습니다.

JSX만 쓰는 글은 `markdown: false`와 `content` 필드를 사용합니다.

마크다운은 GFM·코드 하이라이트를 지원합니다.

---

## Giscus 댓글

설정은 `src/config/giscus.js`입니다. 저장소에 Giscus 앱 설치, Discussions·카테고리 ID 설정이 필요합니다. SPA 이동 시 스레드가 바뀌도록 `GiscusComments`에서 `pathname` 기준 `key`를 사용합니다.

---

## 라이선스

MIT
