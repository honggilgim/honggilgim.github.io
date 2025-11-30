// 마크다운 파일 import
import testPostMd from '../posts/test-post.md?raw'
import javaWrapperClassMd from '../posts/java-wrapper-class.md?raw'
import struts2FrameworkMd from '../posts/struts2-framework.md?raw'
import javaParallelProcessingMd from '../posts/java-parallel-processing.md?raw'
import kakaoOauthErrorSolutionsMd from '../posts/kakao-oauth-error-solutions.md?raw'
import bitmaskStudyMd from '../posts/bitmask-study.md?raw'
import tomcatContextPathSeparationMd from '../posts/tomcat-context-path-separation.md?raw'
import serverCharsetSettingMd from '../posts/server-charset-setting.md?raw'
import javaIntroductionMd from '../posts/java-introduction.md?raw'
import javaStringComparisonMd from '../posts/java-string-comparison.md?raw'
import javaVariablesMd from '../posts/java-variables.md?raw'
import javaOperatorsMd from '../posts/java-operators.md?raw'
import javaControlStatementsMd from '../posts/java-control-statements.md?raw'
import javaArrayBasicMd from '../posts/java-array-basic.md?raw'
import javaArrayStringMultidimensionalMd from '../posts/java-array-string-multidimensional.md?raw'
import javaOopObjectInstanceMd from '../posts/java-oop-object-instance.md?raw'
import javaOopMethodReturnMd from '../posts/java-oop-method-return.md?raw'
import javaOopMethodCallMd from '../posts/java-oop-method-call.md?raw'
import javaOopOverloadingConstructorMd from '../posts/java-oop-overloading-constructor.md?raw'
import javaOopInheritanceMd from '../posts/java-oop-inheritance.md?raw'
import javaOopOverridingImportMd from '../posts/java-oop-overriding-import.md?raw'
import javaOopModifierMd from '../posts/java-oop-modifier.md?raw'
import javaOopPolymorphismMd from '../posts/java-oop-polymorphism.md?raw'
import javaOopAbstractInterfaceMd from '../posts/java-oop-abstract-interface.md?raw'
import javaExceptionHandlingMd from '../posts/java-exception-handling.md?raw'
import javascriptFloatingPointErrorMd from '../posts/javascript-floating-point-error.md?raw'
import algorithmTipsMd from '../posts/algorithm-tips.md?raw'
import troubleshootingUnusualDomainMd from '../posts/troubleshooting-unusual-domain.md?raw'
import javaVersionUpgradeMd from '../posts/java-version-upgrade.md?raw'
import troubleshootingIosClickIssueMd from '../posts/troubleshooting-ios-click-issue.md?raw'
import troubleshootingImgSessionErrorMd from '../posts/troubleshooting-img-session-error.md?raw'
import javaVersionComparison811Md from '../posts/java-version-comparison-8-11.md?raw'
import javaVersionComparison1721Md from '../posts/java-version-comparison-17-21.md?raw'
import ollamaSummaryPracticeMd from '../posts/ollama-summary-practice.md?raw'
import ollamaApiServerPracticeMd from '../posts/ollama-api-server-practice.md?raw'
import bitmaskLeetcodeSingleNumberMd from '../posts/bitmask-leetcode-single-number.md?raw'
import wishTicketProjectSetupMd from '../posts/wish-ticket-project-setup.md?raw'
import wishTicketProjectDbSetupMd from '../posts/wish-ticket-project-db-setup.md?raw'
import wishTicketProjectJpaSetupMd from '../posts/wish-ticket-project-jpa-setup.md?raw'
import wishTicketProjectDeploymentMd from '../posts/wish-ticket-project-deployment.md?raw'

export const posts = [
  {
    id: 1,
    title: '첫 번째 포스트',
    date: '2025-01-15',
    excerpt: 'React와 GitHub Pages로 블로그를 만드는 과정을 소개합니다.',
    tags: ['React', 'GitHub Pages'],
    thumbnail: '/thumbnails/REACT.png',
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
    thumbnail: '/thumbnails/REACT.png',
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
  // {
  //   id: 3,
  //   title: '마크다운 테스트 포스트',
  //   date: '2025-01-17',
  //   excerpt: '마크다운으로 작성된 테스트 포스트입니다.',
  //   tags: ['Markdown', 'Test'],
  //   thumbnail: '/thumbnails/MARKDOWN.png',
  //   markdown: true,
  //   markdownContent: testPostMd
  // },
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
    thumbnail: '/thumbnails/ALGORITHM.png',
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
    thumbnail: '/thumbnails/INFRA.png',
    markdown: true,
    markdownContent: tomcatContextPathSeparationMd
  },
  {
    id: 10,
    title: '서버 charset 맞추기',
    date: '2024-11-14',
    excerpt: '서버 간 통신에서 중요한 charset 설정에 대해 알아봅니다. MariaDB와 Oracle에서의 인코딩 변경 방법과 권장 설정을 정리합니다.',
    tags: ['MariaDB', 'linux', 'oracle'],
    series: 'DB',
    thumbnail: '/thumbnails/DB.png',
    markdown: true,
    markdownContent: serverCharsetSettingMd
  },
  {
    id: 11,
    title: '자바 (1) - java란?',
    date: '2024-11-14',
    excerpt: '스프링 개발자로서 자바 기초를 다지기 위해 자바의 정석을 공부하며 정리한 자바의 특징과 기초 개념에 대해 알아봅니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaIntroductionMd
  },
  {
    id: 12,
    title: '자바 비교 연산자 ==, equals',
    date: '2024-11-18',
    excerpt: '회사에서 발생한 String 비교 연산자 문제를 해결하며 배운 자바 String 비교 연산자와 equals() 메서드의 차이점과 올바른 사용법을 정리합니다.',
    tags: ['스프링 부트', '자바', '트러블 슈팅'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaStringComparisonMd
  },
  {
    id: 13,
    title: '자바 (2) - 변수',
    date: '2024-11-19',
    excerpt: '자바의 변수, 타입, 기본형과 참조형, 상수와 리터럴에 대해 알아봅니다. 변수 선언 방법과 명명 규칙, 각 자료형의 특징을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaVariablesMd
  },
  {
    id: 14,
    title: '자바 (3) - 연산자',
    date: '2024-11-22',
    excerpt: '자바의 연산자에 대해 알아봅니다. 산술 연산자, 비교 연산자, 논리 연산자, 단항 연산자, 삼항 연산자 등 다양한 연산자의 사용법과 주의사항을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOperatorsMd
  },
  {
    id: 15,
    title: '자바 (4) - 조건문과 반복문',
    date: '2024-11-23',
    excerpt: '자바의 제어문에 대해 알아봅니다. if문, switch문 등의 조건문과 for문, while문, do-while문 등의 반복문, 그리고 break와 continue 문의 사용법을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaControlStatementsMd
  },
  {
    id: 16,
    title: '소원권 프로젝트 - 1. 프로젝트 구성',
    date: '2024-11-23',
    excerpt: '커플 소원권 앱 프로젝트의 백엔드 구성에 대해 정리합니다. Java 21, Spring Boot 3.4.0, MariaDB를 사용한 프로젝트 설정과 의존성 구성을 소개합니다.',
    tags: ['Java', 'MariaDB', 'Spring boot'],
    series: '프로젝트',
    thumbnail: '/thumbnails/WISH.png',
    markdown: true,
    markdownContent: wishTicketProjectSetupMd
  },
  {
    id: 17,
    title: '소원권 프로젝트 - 2. DB 설정 및 연결',
    date: '2024-11-24',
    excerpt: 'MariaDB 데이터베이스 생성 및 DBeaver를 통한 접속 방법, 그리고 Spring Boot와 MariaDB 연결 설정 방법을 정리합니다.',
    tags: ['MariaDB'],
    series: '프로젝트',
    thumbnail: '/thumbnails/WISH.png',
    markdown: true,
    markdownContent: wishTicketProjectDbSetupMd
  },
  {
    id: 18,
    title: '소원권 프로젝트 - 3. jpa Repository 및 Entity, Service 생성',
    date: '2024-11-27',
    excerpt: 'JPA를 사용한 Repository와 Entity 클래스 생성 방법, 그리고 Service 계층에서 JPA 기본 제공 메소드를 활용하는 방법을 정리합니다.',
    tags: ['Spring boot'],
    series: '프로젝트',
    thumbnail: '/thumbnails/WISH.png',
    markdown: true,
    markdownContent: wishTicketProjectJpaSetupMd
  },
  {
    id: 19,
    title: '소원권 프로젝트 - 4. 서버 구성 및 배포',
    date: '2024-12-01',
    excerpt: 'NCP 클라우드 환경에서 Java 서비스를 배포하는 방법을 정리합니다. JDK 설치, MariaDB 설정, 그리고 Spring Boot의 bootJar를 생성하여 서버에 배포하는 과정을 소개합니다.',
    tags: ['Spring boot', 'ncp'],
    series: '프로젝트',
    thumbnail: '/thumbnails/NCP.png',
    markdown: true,
    markdownContent: wishTicketProjectDeploymentMd
  },
  {
    id: 20,
    title: '자바 (5) - 배열1. 기본',
    date: '2024-12-01',
    excerpt: '자바의 배열에 대해 알아봅니다. 배열의 선언, 생성 과정, 길이와 인덱스, 그리고 초기화 방법을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaArrayBasicMd
  },
  {
    id: 21,
    title: '자바 (5) - 배열(2). String 배열, 다차원 배열',
    date: '2024-12-02',
    excerpt: 'String 배열과 char 배열의 관계, 커맨드라인 인자 사용법, 그리고 다차원 배열의 선언과 사용 방법을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaArrayStringMultidimensionalMd
  },
  {
    id: 22,
    title: '자바 (6) - 객체지향 프로그래밍(1)_객체, 인스턴스',
    date: '2024-12-06',
    excerpt: '자바 객체지향 프로그래밍의 기본 개념을 알아봅니다. 객체지향의 장점, 클래스와 객체의 관계, 인스턴스의 생성과 사용 방법을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopObjectInstanceMd
  },
  {
    id: 23,
    title: '자바 (6) - 객체지향 프로그래밍(2)_메서드, 반환타입',
    date: '2024-12-08',
    excerpt: '자바 메서드의 선언과 구현, 호출 방법, 그리고 기본형 매개변수와 참조형 매개변수의 차이점, 참조형 반환타입에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopMethodReturnMd
  },
  {
    id: 24,
    title: '자바 (6) - 객체지향 프로그래밍(3)_호출',
    date: '2024-12-08',
    excerpt: '자바의 재귀 호출, 클래스 메서드와 인스턴스 메서드의 차이점, 그리고 클래스 멤버와 인스턴스 멤버 간의 참조와 호출에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopMethodCallMd
  },
  {
    id: 25,
    title: '자바 (6) - 객체지향 프로그래밍(4)_ 오버로딩, 생성자, 초기화',
    date: '2024-12-10',
    excerpt: '자바의 메서드 오버로딩, 생성자, 그리고 변수의 초기화 방법(명시적 초기화, 초기화 블럭)에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopOverloadingConstructorMd
  },
  {
    id: 26,
    title: '자바 (6) - 객체지향 프로그래밍(5)- 상속',
    date: '2024-12-11',
    excerpt: '자바의 상속에 대해 알아봅니다. 상속의 정의와 장점, 클래스 간의 포함 관계, 상속과 포함 관계의 구분 방법, 그리고 Object 클래스에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopInheritanceMd
  },
  {
    id: 27,
    title: '비트마스킹 : leetcode 136 - Single Number',
    date: '2024-12-14',
    excerpt: '비트마스킹을 활용한 LeetCode 136번 Single Number 문제 풀이. XOR 연산을 이용한 효율적인 해결 방법을 정리합니다.',
    tags: ['algorithm'],
    series: '알고리즘',
    thumbnail: '/thumbnails/ALGORITHM.png',
    markdown: true,
    markdownContent: bitmaskLeetcodeSingleNumberMd
  },
  {
    id: 28,
    title: '자바 (6) - 객체지향 프로그래밍(8)- 오버라이딩, import',
    date: '2024-12-15',
    excerpt: '자바의 오버라이딩에 대해 알아봅니다. 오버라이딩의 조건, 오버로딩과의 차이점, super와 super(), 그리고 package와 import 문에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopOverridingImportMd
  },
  {
    id: 29,
    title: '자바 (6) - 객체지향 프로그래밍(9)- 제어자',
    date: '2024-12-17',
    excerpt: '자바의 제어자에 대해 알아봅니다. static, final, abstract 제어자와 접근 제어자(public, protected, default, private)의 사용법과 캡슐화에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopModifierMd
  },
  {
    id: 30,
    title: '자바 (6) - 객체지향 프로그래밍(10)- 다형성',
    date: '2024-12-21',
    excerpt: '자바의 다형성에 대해 알아봅니다. 참조변수의 형변환, instanceof 연산자, 그리고 참조변수와 인스턴스의 연결에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopPolymorphismMd
  },
  {
    id: 31,
    title: '자바 (6) - 객체지향 프로그래밍(11)- 추상 클래스, 인터페이스',
    date: '2024-12-24',
    excerpt: '자바의 추상 클래스와 인터페이스에 대해 알아봅니다. 추상 메서드, 인터페이스의 작성과 구현, 인터페이스를 이용한 다형성, 그리고 인터페이스의 장점에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaOopAbstractInterfaceMd
  },
  {
    id: 32,
    title: '자바 (7) - 예외처리',
    date: '2025-02-10',
    excerpt: '자바의 예외처리에 대해 알아봅니다. 프로그램 오류의 종류, 예외 클래스의 계층 구조, try-catch 문, throw 구문, finally 구문, 사용자정의 Exception, 그리고 checkedException과 uncheckedException에 대해 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaExceptionHandlingMd
  },
  {
    id: 33,
    title: 'JavaScript 소수점 오류',
    date: '2025-02-11',
    excerpt: 'JavaScript에서 발생하는 부동소수점 오류에 대해 알아봅니다. IEEE 754 표준과 고정소수점, 부동소수점 방식의 차이점을 정리합니다.',
    tags: ['트러블 슈팅'],
    series: '트러블 슈팅',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javascriptFloatingPointErrorMd
  },
  {
    id: 34,
    title: 'Algorithm 잡기술',
    date: '2025-02-25',
    excerpt: '알고리즘 문제 풀이에 유용한 잡기술들을 정리합니다. 아스키 코드 활용, 중복 제거 방법, bool 형식 리턴 등 C++ 기준의 실전 팁을 소개합니다.',
    tags: ['algorithm'],
    series: '알고리즘',
    thumbnail: '/thumbnails/ALGORITHM.png',
    markdown: true,
    markdownContent: algorithmTipsMd
  },
  {
    id: 35,
    title: '(트러블슈팅) 특이한 도메인이 들어올 경우',
    date: '2025-07-25',
    excerpt: '운영 중 발생한 특이한 URL 접근 사례를 정리합니다. FCKeditor 취약점 스캔 공격, PHP 스캔 공격, robots.txt와 sitemap.xml로 인한 유입 등 실제 경험한 케이스를 소개합니다.',
    tags: ['운영이슈'],
    series: '트러블 슈팅',
    thumbnail: '/thumbnails/TROUBLESHOOTING.png',
    markdown: true,
    markdownContent: troubleshootingUnusualDomainMd
  },
  {
    id: 36,
    title: 'java 버전 업데이트 방안',
    date: '2025-08-10',
    excerpt: 'JDK 1.7에서 1.8로 업그레이드하는 과정을 정리합니다. 로컬 환경 준비, 검증 환경 작업, 운영 환경 적용까지의 전체 과정과 발생한 문제점 및 해결 방법을 소개합니다.',
    tags: ['Infra', 'Spring', 'apache', 'tomcat'],
    series: '스프링_infra',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaVersionUpgradeMd
  },
  {
    id: 37,
    title: '(트러블 슈팅) - ios 클릭 문제',
    date: '2025-08-17',
    excerpt: 'iOS 웹앱에서 발생한 클릭 이벤트 문제를 해결한 과정을 정리합니다. 300ms 딜레이, 터치 이벤트 충돌, 중복 클릭 방지 등 다양한 시도와 최종 해결 방법을 소개합니다.',
    tags: ['iOS', '클릭 안됨', '트러블 슈팅'],
    series: '트러블 슈팅',
    thumbnail: '/thumbnails/IOS.png',
    markdown: true,
    markdownContent: troubleshootingIosClickIssueMd
  },
  {
    id: 38,
    title: 'Java 버전 비교 1편 : Java 8, 11',
    date: '2025-08-24',
    excerpt: 'Java 8과 Java 11의 주요 기능과 차이점을 비교합니다. LTS 버전의 의미, 람다 표현식, Stream API, HTTP Client API 등 각 버전의 특징을 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaVersionComparison811Md
  },
  {
    id: 39,
    title: '(트러블 슈팅) img 호출 시 세션 오류',
    date: '2025-08-31',
    excerpt: 'Tomcat 7에서 8로 업그레이드 후 이미지 호출 시 발생한 세션 오류를 해결한 과정을 정리합니다. FlashMap과 세션 처리 방식의 차이점과 해결 방법을 소개합니다.',
    tags: ['트러블 슈팅'],
    series: '트러블 슈팅',
    thumbnail: '/thumbnails/SESSION_ERROR.png',
    markdown: true,
    markdownContent: troubleshootingImgSessionErrorMd
  },
  {
    id: 40,
    title: 'Java 버전 비교 2편 : Java 17, 21',
    date: '2025-09-07',
    excerpt: 'Java 17과 Java 21의 주요 기능과 차이점을 비교합니다. Record, Pattern Matching, Virtual Threads, String Templates 등 각 버전의 특징과 프로젝트 선택 가이드를 정리합니다.',
    tags: ['Java'],
    series: '자바',
    thumbnail: '/thumbnails/JAVA.png',
    markdown: true,
    markdownContent: javaVersionComparison1721Md
  },
  {
    id: 41,
    title: 'Ollama 정리 및 실습',
    date: '2025-09-21',
    excerpt: '로컬 LLM 런타임인 Ollama의 기본 사용법과 실습을 정리합니다. 모델 설치, API 사용, Open WebUI를 통한 웹 챗봇 구축까지 단계별로 설명합니다.',
    tags: ['OLLAMA'],
    series: 'ML',
    thumbnail: '/thumbnails/OLLAMA.png',
    markdown: true,
    markdownContent: ollamaSummaryPracticeMd
  },
  {
    id: 42,
    title: 'Ollama 실습 _ ollama를 api 서버로 사용하자!',
    date: '2025-09-28',
    excerpt: 'Ollama를 API 서버로 활용하여 Spring Boot 애플리케이션에 통합하는 실습을 정리합니다. Llama 3.2, DeepSeek-R1 모델 비교 및 에러 로그 분석 AI 에이전트 구현 사례를 소개합니다.',
    tags: ['OLLAMA', 'Spring'],
    series: 'ML',
    thumbnail: '/thumbnails/OLLAMA.png',
    markdown: true,
    markdownContent: ollamaApiServerPracticeMd
  }
]

