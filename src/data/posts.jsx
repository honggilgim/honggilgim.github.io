// 마크다운 파일 import
import testPostMd from '../posts/test-post.md?raw'
import javaWrapperClassMd from '../posts/java-wrapper-class.md?raw'
import struts2FrameworkMd from '../posts/struts2-framework.md?raw'
import javaParallelProcessingMd from '../posts/java-parallel-processing.md?raw'
import kakaoOauthErrorSolutionsMd from '../posts/kakao-oauth-error-solutions.md?raw'
import bitmaskStudyMd from '../posts/bitmask-study.md?raw'
import tomcatContextPathSeparationMd from '../posts/tomcat-context-path-separation.md?raw'
import serverCharsetSettingMd from '../posts/server-charset-setting.md?raw'

export const posts = [
  {
    id: 1,
    title: '첫 번째 포스트',
    date: '2025-01-15',
    excerpt: 'React와 GitHub Pages로 블로그를 만드는 과정을 소개합니다.',
    tags: ['React', 'GitHub Pages'],
    markdown: false,
    content: (
      <div>
        <h2>소개</h2>
        <p>
          이 포스트는 React와 GitHub Pages를 사용하여 블로그를 만드는 방법에 대해 설명합니다.
        </p>
        <h2>주요 기능</h2>
        <ul>
          <li>React 기반의 현대적인 UI</li>
          <li>GitHub Pages를 통한 무료 호스팅</li>
          <li>자동 배포 워크플로우</li>
        </ul>
        <h2>마무리</h2>
        <p>
          이 블로그는 계속해서 업데이트될 예정입니다. 많은 관심 부탁드립니다!
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'React 컴포넌트 작성하기',
    date: '2025-01-16',
    excerpt: 'React 컴포넌트를 작성하는 베스트 프랙티스를 알아봅니다.',
    tags: ['React', 'JavaScript'],
    markdown: false,
    content: (
      <div>
        <h2>컴포넌트란?</h2>
        <p>
          React 컴포넌트는 재사용 가능한 UI 요소입니다. 함수형 컴포넌트와 클래스 컴포넌트가 있지만,
          최근에는 함수형 컴포넌트와 Hooks를 주로 사용합니다.
        </p>
        <h2>예제 코드</h2>
        <pre>
          <code>{`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`}</code>
        </pre>
        <h2>마무리</h2>
        <p>
          컴포넌트를 잘 활용하면 코드의 재사용성과 유지보수성을 크게 향상시킬 수 있습니다.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: '마크다운 테스트 포스트',
    date: '2025-01-17',
    excerpt: '마크다운으로 작성된 테스트 포스트입니다.',
    tags: ['Markdown', 'Test'],
    markdown: true,
    markdownContent: testPostMd
  },
  {
    id: 4,
    title: '자바 Wrapper Class',
    date: '2023-10-18',
    excerpt: '자바의 Wrapper Class와 boxing, unboxing에 대해 알아봅니다.',
    tags: ['자바', 'Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaWrapperClassMd
  },
  {
    id: 5,
    title: '스트럿츠2 프레임워크',
    date: '2023-10-23',
    excerpt: 'Apache Struts 2 프레임워크의 특징과 스프링 프레임워크와의 차이점을 알아봅니다.',
    tags: ['자바', 'Struts2', '프레임워크'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: struts2FrameworkMd
  },
  {
    id: 6,
    title: '자바 병렬 처리',
    date: '2023-10-25',
    excerpt: '자바의 병렬 처리와 Fork-Join Pool을 활용한 대용량 데이터 처리 방법을 알아봅니다.',
    tags: ['자바', 'Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaParallelProcessingMd
  },
  {
    id: 7,
    title: '카카오 oAuth 연동 개발 과정 오류 해결 방법 모음',
    date: '2024-05-07',
    excerpt: '전자정부 프레임워크 환경에서 카카오 OAuth 연동 시 발생한 SSL Handshake, 웹앱 환경, CORS 에러 해결 방법을 정리합니다.',
    tags: ['자바', 'Java', 'OAuth'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: kakaoOauthErrorSolutionsMd
  },
  {
    id: 8,
    title: '비트마스킹 공부',
    date: '2023-10-28',
    excerpt: '비트마스킹 알고리즘의 기본 개념과 비트 연산자를 활용한 집합 구현 방법을 C++ 코드로 알아봅니다.',
    tags: ['알고리즘'],
    series: '알고리즘',
    markdown: true,
    markdownContent: bitmaskStudyMd
  },
  {
    id: 9,
    title: 'Tomcat(Server) context-path 분리로 ROOT 폴더 2개로 서버 운영하기',
    date: '2024-11-14',
    excerpt: '톰캣의 context-path를 활용하여 하나의 서버에서 두 개의 ROOT 폴더로 서로 다른 프로젝트를 운영하는 방법과 개발 과정에서 겪은 문제점과 해결 방법을 정리합니다.',
    tags: ['Spring', 'Spring boot', 'tomcat'],
    series: '인프라',
    markdown: true,
    markdownContent: tomcatContextPathSeparationMd
  },
  {
    id: 10,
    title: '서버 charset 맞추기',
    date: '2024-11-14',
    excerpt: '서버 간 통신에서 중요한 charset 설정에 대해 알아봅니다. MariaDB와 Oracle에서의 인코딩 변경 방법과 권장 설정을 정리합니다.',
    tags: ['MariaDB', 'Oracle', '인코딩', 'charset'],
    series: '인프라',
    markdown: true,
    markdownContent: serverCharsetSettingMd
  }
]

