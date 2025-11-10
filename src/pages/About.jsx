import './About.css'

function About() {
  return (
    <div className="about">
      <h1>About</h1>
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
  )
}

export default About

