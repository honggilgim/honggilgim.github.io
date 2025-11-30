## 자바 버전

프로젝트를 새롭게 진행하게 되어 자바 버전을 선택해야 할 일이 생겼다. 자바 버전은 보통 8, 11, 17, 21 이 4가지 버전을 많이 사용하고, 흔히들 LTS 버전이라고 한다. 각 버전별 차이가 뭐가 있을지 그리고 무엇을 선택하면 좋을지 고민했던 과정을 겪었고 이에 각 버전들의 특징 및 LTS 버전이 무엇인지를 적어서 기록해두고자 한다.

## LTS 버전이란?

> LTS(Long Term Support)는 쉽게 오래 지원해주는 버전을 말한다. 일반적으로 3년마다 출시되며, 출시 후 5년 동안 기술 지원이 이루어진다.

보통 자바로 프로젝트를 진행할 때는, 10에 아홉 정도는 LTS 버전으로 선택하여 작업을 진행한다.

Java 21과 Java 22를 예로 들면 Java 22의 경우는 21의 가장 큰 특징인 Virtual Thread의 진화 버전인 Improved Virtual Threads를 지원하여 자바 21을 쓰느니 자바 22를 쓰는게 낫다는 생각이 들지만, 가장 큰 차이점으로 자바 22는 LTS 버전이 아니기에 안정적인 환경이라고 보기 힘들다.

### 현재의 LTS 버전은?

현재 LTS 버전은 총 4가지가 존재한다. 8, 11, 17, 21 각 버전별로 특징이 있고, 어떤 버전을 선택하는지에 따라 코딩의 방향과 흐름이 크게 달라진다.

## Java 8

가장 대표적인 자바 버전 8이다. 가장 많은 시스템에 도입되어 있고 우리나라에서 운영하는 레거시 시스템은 대다수가 자바 8 버전을 운용한다. 자바 7과는 큰 차이점이 존재하고 자바 환경에서 가장 큰 변화 중 하나로 꼽힐 정도로 성공적으로 평가받는 버전이다. 함수형 프로그래밍 개념을 본격적으로 도입했고, Stream API 같이 아주 많이 사용되는 개념들이 자바 8부터 등장했다. 자바 프로그래머라면 애증하는 버전이다.

~~엄청나게 발전했지만, 지금 보면 구닥다리인 버전~~

### 1. 람다 표현식 (Lambda Expressions)

- 가독성 향상, 익명 함수, 익명 클래스 제거

```java
// 기존
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
}).start();

// 람다
new Thread(() -> System.out.println("Hello")).start();
```

### 2. 함수형 인터페이스 (Functional Interfaces)

- 추상 메서드가 딱 하나만 있는 인터페이스
- 람다 표현식은 이러한 인터페이스의 **단일 추상 메서드(SAM, Single Abstract Method)**를 구현하는 방식으로 사용
- `@FunctionalInterface` 애노테이션은 명시적으로 해당 인터페이스가 함수형 인터페이스임을 선언할 때 사용
- 람다와 깊게 연관되는 개념으로, 람다 표현식 = 함수형 인터페이스의 **단일 메서드 구현**을 간단히 표현한다.

```java
@FunctionalInterface
interface Function {
    void execute();
}
```

### 3. Stream API

- 컬렉션/배열 데이터를 **선언적**이고 **함수형**으로 다룰 수 있게 해준다.
- 데이터 필터링, 매핑, 집계, 정렬 등을 손쉽게 처리
- ~~아주 깊숙히 들어가 생각하지 않으면 보통 이 부분이 가장 체감된다.~~

```java
List<String> test = Arrays.asList("one", "two", "three");
test.stream()
     .filter(n -> n.startsWith("o")) // 조건
     .map(String::toUpperCase) // 변환
     .forEach(System.out::println); // 최종 동작 - ONE
```

### 4. 메서드 레퍼런스 (Method References)

- 람다 표현식에서 이미 존재하는 메서드만 호출한다면 더 간단하게 표현 가능

```java
list.forEach(System.out::println);
```

### 5. 디폴트 메서드 (Default Methods)

- 인터페이스에 **구현이 있는 메서드**를 정의할 수 있음
- 기존 인터페이스를 확장해도 구현 클래스가 깨지지 않음
- ~~거의 안 쓰인다.~~

```java
interface MyInterface {
    void method1();
    default void method2() {
        System.out.println("test");
    }
}
```

### 6. Optional 클래스

- `null` 처리용 객체

```java
Optional<String> name = Optional.ofNullable(getName());
```

### 7. 새로운 Date & Time API (java.time)

- `java.util.Date`와 `Calendar`의 단점을 개선
- 불변(Immutable) 객체
- 가독성이 좋은 API 제공

```java
LocalDate today = LocalDate.now();
LocalDate tomorrow = today.plusDays(1);
LocalDate birthday = LocalDate.of(1998, 2, 16);
```

### 8. Nashorn JavaScript 엔진

- JVM에서 자바스크립트를 실행할 수 있는 엔진 (Java 15에서 제거됨)
- ~~공부하면서 있는 건 알았는데 딱히 쓸 일은 없다.~~

### 9. CompletableFuture (비동기 프로그래밍)

- 병렬/비동기 작업을 쉽게 처리할 수 있게 도와준다.

```java
CompletableFuture.supplyAsync(() -> "Hello")
                 .thenApply(s -> s + " World")
                 .thenAccept(System.out::println);
```

## Java 11

2018년 9월 출시된 LTS 버전이다. 개인적으로 조금 애매한 버전이라고 생각하는데, 자바 8은 오래된 시스템에 많이 사용되지만 자바 11을 쓸 정도로 오래된 시스템은 보통 자바 17을 쓴다.

### 1. 새로운 문자열 메서드

- `isBlank()`: 공백 문자열 확인
- `lines()`: 문자열을 줄 단위 스트림으로 반환
- `strip()`, `stripLeading()`, `stripTrailing()`: 공백 제거 (trim()보다 유니코드 지원 개선)
- `repeat(n)`: 문자열 반복

```java
String str = "  Hello  ";
System.out.println(str.isBlank()); // false
System.out.println(str.strip());   // "Hello"
System.out.println("abc\nxyz".lines().count()); // 2
System.out.println("Hello".repeat(3)); // HelloHelloHello
```

### 2. 컬렉션, Optional 개선

- `Optional`에 `isEmpty()` 추가
- 컬렉션 변경 없이 새로운 리스트를 만드는 `toArray(IntFunction<T[]>)` 추가

```java
Optional<String> opt = Optional.empty();
System.out.println(opt.isEmpty()); // true
```

### 3. Var를 이용한 지역 변수 타입 추론 (자바 10부터)

- 실무에서는 써본 적 없다.

```java
var list = List.of(1, 2, 3); // 타입 명시 불필요
```

### 4. HTTP Client API

- `HttpURLConnection`보다 현대적이고 비동기를 지원한다.
- HTTP/2 지원, WebSocket 지원한다.

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

### 5. JEP 321: HTTP Client 표준화

- `java.net.http.HttpClient` 표준 API로 포함한다.
- 동기/비동기 요청 가능하다.
- JSON 처리 라이브러리와 결합 용이하다.

```java
// java 8
URL url = new URL("https://jsonplaceholder.typicode.com/todos/1");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("GET");
BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuilder content = new StringBuilder();
while ((inputLine = in.readLine()) != null) {
    content.append(inputLine);
}
in.close();
con.disconnect();
System.out.println(content);
```

```java
// java 11
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://jsonplaceholder.typicode.com/todos/1"))
        .GET()
        .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

그 외 GC 개선 등 JVM의 구동 효율도 크게 상승했다.

## 결론

글이 너무 길어져 이 글에는 자바 8과 11만 작성하고, 이후에 자바 17과 21을 작성하고자 한다.

### 자바 8, 11 기능별 차이

| 구분 | Java 8 | Java 11 |
|------|--------|---------|
| **출시 연도** | 2014 | 2018 |
| **Lambda & Stream** | 도입, 함수형 프로그래밍 지원 | 유지 |
| **Optional** | Optional 클래스 도입 | 유지 |
| **HTTP Client** | `HttpURLConnection` 사용 | `java.net.http.HttpClient` 표준화 (동기/비동기 지원) |
| **Local-Variable Type Inference** | 없음 | `var` 키워드 도입 (지역 변수 타입 추론) |
| **JEP 321** | 해당 없음 | HTTP Client API 표준화 |
| **Garbage Collector** | Parallel, CMS | G1 GC 기본, ZGC 도입 가능 (옵션) |
| **String 클래스 기능** | - | `isBlank()`, `lines()`, `strip()`, `repeat()` 등 추가 |
| **새로운 Collection API** | Optional, Stream | `toUnmodifiableList()`, `toUnmodifiableSet()` 등 추가 |
| **기타 주요 변경** | - | TLS 1.3 지원, Flight Recorder 상용화, Unicode 10 지원 |

