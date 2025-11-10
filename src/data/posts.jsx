// 마크다운 파일 import
import testPostMd from '../posts/test-post.md?raw'
import javaWrapperClassMd from '../posts/java-wrapper-class.md?raw'

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
  }
]

