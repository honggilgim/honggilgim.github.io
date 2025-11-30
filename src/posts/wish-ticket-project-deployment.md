## 개요

프로젝트를 구성하다 보면 구현이 끝나도 배포를 해야 하는 상황이 온다. 배포는 학교에서 발표만 하고 끝나는 프로젝트를 클라우드 환경에서 구동하여 바깥으로 배포할 수 있게 만들어준다. 이 환경을 구성하고 설정했던 부분을 써 놓으려고 한다.

## 클라우드 환경 설정

클라우드는 크게 AWS, NCP 두 가지 회사가 있다. AWS는 전 세계 1위의 회사이고 좋은 클라우드 환경을 제공하지만, 한국이니만큼 NCP도 AWS에 뒤쳐지지 않는 훌륭한 환경이 되어준다고 생각한다. 나는 같이 프로젝트 하는 친구가 NCP를 결제하여 가지고 있었기에 그 친구의 NCP를 사용하기로 했다.

## 환경 설정

자바 서비스를 클라우드 환경에서 구동하기 위해 필요한 것들을 설치해주어야 한다.

### 1. JDK

Java 서비스를 위해서는 역시 Java를 클라우드 환경에 설치해주어야 한다. 클라우드 환경은 리눅스 OS를 사용하고 있고, Java는 손쉽게 설치가 가능하다.

이 부분은 역시 친구가 전부 세팅해두었기에

`java -version` 명령어를 사용해

![Java 버전 확인](https://velog.velcdn.com/images/honggilgim/post/1254284a-92eb-4da7-acf2-b26366ef9b61/image.png)

정상적으로 설치되었는지만 확인했다.

### 2. DB

로컬 DB가 아닌 클라우드 환경에도 DB를 설치해야 한다.

![MariaDB 설치](https://velog.velcdn.com/images/honggilgim/post/c3f3c703-68a0-41e2-b3dc-f765066dd08b/image.png)

설치 후, 기동까지 확인하자

기동 확인 명령어는 `ps -ef | grep mysql`로 하면 된다.

![MariaDB 기동 확인](https://velog.velcdn.com/images/honggilgim/post/9fd5d99e-3aae-4956-b949-ec9ac63d5087/image.png)

## 자바 서비스 환경 올리기 및 구동

자바 스프링 서비스가 올라가는 환경에는 크게 3가지 경우가 있다.

1. **WAR**
2. **JAR**
3. **Class 파일**

WAR와 JAR는 패키징하는 방식의 차이만 있을 뿐 성능 등 큰 이슈는 존재하지 않는다. 다만, 스프링 부트 자체는 JAR 파일을 권장하고 있고 WAR파일은 JSP 파일을 사용했을 때 권장된다고 하는데 우리 프론트 환경은 React이므로 굳이 WAR를 사용하지 않고 JAR를 사용하기로 했다.

Class 파일의 경우는 class 파일을 통째로 서버로 올려 구동하는 방식이다. 이 방식은 손쉽게 서버로 올릴 수 있고 Tomcat의 hot-deploy, hot-reload 등 바로바로 반영해주는 다양한 기능을 활용할 수 있다는 장점이 있지만 아주 큰 단점으로 프로젝트 관리가 어렵다. 그래서 JAR 파일을 활용하기로 최종 결정했다.

### 스프링 부트 JAR 파일 만들기

스프링 부트는

**bootJar**라고 하는 JAR 파일을 지원해준다.

JAR파일을 확장시키는 플러그인을 포함한 JAR 파일로 JAR파일의 경우 JAR 파일로 배포 후 import 등을 활용하여 자바 프로젝트 설계에 활용할 수 있지만, 그 자체만으로 단독 실행은 불가능하다. 하지만 bootJar는 단독 실행을 지원해준다.

#### 1. 스프링 부트 프로젝트 Gradle 설정

![Gradle 설정](https://velog.velcdn.com/images/honggilgim/post/39a00c73-bfe7-45e4-a265-a0bbd498ccc8/image.png)

bootJar를 위한 스프링 디펜던시 추가다.

이 `implementation`은 스프링 부트 디펜던시를 관리해준다. 또한 어플리케이션의 패키징을 도와준다.

로컬 환경에서는 정상적으로 동작하더라도, 배포를 위해 JAR 파일을 만들 때 오류가 발생하는 경우가 많은데 그 경우를 해결하도록 도와주는 고마운 플러그인이다. 나 역시 이 플러그인 추가로 에러 없이 정상적으로 JAR 빌드 후 배포에 성공했다.

![Manifest 설정](https://velog.velcdn.com/images/honggilgim/post/150f238a-61b2-4084-92b1-c1476fc49d6e/image.png)

JAR의 manifest는 빌드 시 main class를 지정해주는 설정이다. 이 지정 없이 진행 시, main class를 찾지 못해 오류가 발생할 수 있다.

#### 2. bootJar 생성

![bootJar 빌드](https://velog.velcdn.com/images/honggilgim/post/3bec5182-3b2e-4749-9683-7a67827a5197/image.png)

Gradle의 경우 IntelliJ에서 손쉽게 bootJar를 만들도록 좋은 방식을 제공한다. 커맨드 명령어로 해도 되지만, 저 부분을 두번 클릭하면 자동으로 bootJar가 생성된다.

![bootJar 빌드 실행](https://velog.velcdn.com/images/honggilgim/post/1bc7672c-e681-4dfe-9552-7c20e8fcc199/image.png)

실제 bootJar를 생성했을 때 이렇게 실행되고 bootJar 파일이 생성된다.

![생성된 JAR 파일](https://velog.velcdn.com/images/honggilgim/post/8596da4d-86a5-4645-b76c-54ecf2ce2936/image.png)

생성된 bootJar 파일은 이렇게 `build/libs`의 하위 경로에 생성된다. 저 파일을 서버에 옮겨서,

![서버에서 실행](https://velog.velcdn.com/images/honggilgim/post/b80447dd-26cf-48ea-90b1-0e5d3ce47110/image.png)

서버 상에서 `java -jar [jar 파일 이름]`

이로 실행 시 서버 상에서 서비스가 실행되고 서버의 IP 및 포트를 설정하여 접속 시 스프링의 간단한 배포를 마무리지을 수 있다.

