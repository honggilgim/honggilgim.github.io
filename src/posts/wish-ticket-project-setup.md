## 개요

프로젝트 기록을 적어보고자 한다. 이번 프로젝트는 간단한 프로젝트로, 커플 사이에 소원권을 주고받을 수 있는 어플을 제작하는 일이다. 프로젝트 아이디어 및 다른 부분은 넣지 않았다.

나는 백엔드 서버를 담당해서 구현하기로 했다.

## 프로젝트 구성

### DB 툴: DBeaver Community Edition

DB 툴은 DBeaver를 사용한다. 이 부분은 개인의 자유라고 본다.

### DB: MariaDB

![MariaDB](https://velog.velcdn.com/images/honggilgim/post/48b10415-c151-4faf-abac-9027bd289711/image.png)

데이터베이스는 무료인 MariaDB를 사용한다. 오라클, MySQL, NoSQL 등 다양한 선택지가 있지만 무료인 점을 생각해 MariaDB로 결정했다.

### Server 툴: IntelliJ

IntelliJ는 가장 강력한 자바 도구이다.

### Java 21

Java는 8, 17, 21의 3가지 버전이 가장 큰 변화를 불러온 버전이라고 생각한다. 기존에 안정되게 운영되는 여러 버전들도 좋지만, 자바 역시 버전이 올라감에 따라 큰 성능 차이가 생기기에 왠만하면 최신 버전을 사용하고 싶었다. 사용할 수 있을지는 모르겠지만, virtual thread 기술을 사용해보고 싶어 21 버전을 선택했다.

### Spring Boot - 3.4.0

스프링 부트는 3.4.0 버전을 선택했다.

### GitHub

GitHub를 사용해 형상관리를 진행한다.

### Dependency

![Dependency](https://velog.velcdn.com/images/honggilgim/post/9c1cf972-f0a2-4218-9d63-06cdfa034c1e/image.png)

1. **JPA**: Database와 연결하기 위한 디펜던시다. MyBatis가 회사에서 사용하는 디펜던시이기에 가장 많이 사용했고 가장 편한 툴이지만 개인 프로젝트인 만큼 사용해본 적이 없는 JPA를 사용하고자 생각했다.

2. **Lombok**: getter와 setter를 자동으로 생성해주는 고마운 디펜던시이다.

3. **spring-boot-devtools**: 개발 환경을 조금 더 쉽게 설정해주는 디펜던시이다.

4. **(예정) GraphQL**: RESTful API와 현재 다양한 분야에서 분리된 API 툴이다. 기존 개념이 많이 다르므로 학습 시간이 필요해 보였지만 개인 프로젝트인 만큼 사용해보고 싶어 넣었다. 같이 프로젝트를 수행하는 팀원과 상의해보고 넣을 예정이다.

그렇게 큰 프로젝트가 아닌 친구와 재미로 하는 프로젝트기에 우선 이정도만 추가하고 필요에 따라 더 추가해볼 예정이다.

