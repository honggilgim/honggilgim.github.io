## 개요

우선 DB를 생성하고자 한다.

## MariaDB 접속

### mariadb

mariadb 안에 직접 접속하는 콘솔 명령어이다. 이렇게 접속할 경우

![MariaDB 콘솔 접속](https://velog.velcdn.com/images/honggilgim/post/7bdb9798-98b2-48ef-899b-fa46afa8190e/image.png)

이렇게 mariadb에 직접 접속하여 쿼리를 칠 수 있는 창이 나온다.

### show databases;

database들을 볼 수 있는 명령어다.

![데이터베이스 목록](https://velog.velcdn.com/images/honggilgim/post/76b4fd09-ccaa-449d-b8ec-0f86a16b35fa/image.png)

현재 맥북에는 총 다섯개의 데이터베이스가 생성되어 있다고 나온다. 미리 생성해둔 데이터베이스들인데,

### create database [DB명];

이 명령어를 통해 데이터베이스를 생성할 수 있다.

## DB툴로 접속

![DBeaver 접속 설정](https://velog.velcdn.com/images/honggilgim/post/d007063e-20a9-4fff-a415-80c920490eae/image.png)

사용하고자 하는 툴인 DBeaver로 데이터베이스를 접속하는 방법이다. username과, serverHost, port만 신경써서 넣어주고 데이터베이스 종류만 잘 지정하면 연결해준다. 데이터베이스 커넥터 관련 오류가 나올 때가 있는데, 로컬에서 개발할 경우는 그냥 DBeaver에서 지원해주는 커넥터 다운받으면 되고 만약 인터넷이 안되는 환경이라면 직접 다운받아서 넣어줘야 한다.

![USE 명령어](https://velog.velcdn.com/images/honggilgim/post/34628e02-7e5f-474a-ac16-c23e10a5c2fc/image.png)

특정 데이터베이스를 사용한다는 명령어이다. 이곳에, 미리 짜둔 DDL을 입력하면 된다.

## Spring과 MariaDB 연결

스프링과 mariadb를 연결하기 위해서는 두 가지 과정이 필요하다.

(application.properties 파일 기준 application.yaml 파일은 따로 찾아야 한다.)

### 환경설정 파일 코드

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/[DataBase 명]
spring.datasource.username=[ROOT]
spring.datasource.password=[PASSWORD]
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
```

이 구문을 프로퍼티 파일에 추가해준다.

![application.properties 설정](https://velog.velcdn.com/images/honggilgim/post/e02f40a7-137b-4d94-b73a-b3e95351bf4e/image.png)

그리고 maven이 아닌 gradle기준으로

```
org.mariadb.jdbc
```

를 디펜던시에 추가해준다. 이 구문을 잘 모르겠으면

> https://mvnrepository.com/

이 사이트를 추천한다.

![Gradle dependency 추가](https://velog.velcdn.com/images/honggilgim/post/94512038-f71f-4f99-93ff-f6692fc9c4f1/image.png)

실제 dependency에 추가한 화면이다. 그리고 스프링을 구동시켜보면,

![데이터베이스 연결 확인](https://velog.velcdn.com/images/honggilgim/post/608495bd-7965-4d48-9572-5272ec158ddd/image.png)

이렇게 로그상에서 데이터베이스와 연결된 모습을 확인할 수 있다.

