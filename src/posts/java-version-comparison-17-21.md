## 자바 버전

앞선 글에 이은 내용으로, 자바 17과 21의 차이다. 개발자로써 큰 변화라고 생각하는 부분 및 실제 사용하는 부분은 따로 굵게 표시해두었다.

## Java 17

**출시 연도:** 2021

**설명:** Java 17은 최신 LTS 버전으로, 안정성과 성능 향상이 강점이라고 한다. 기존 기능을 유지하면서 패턴 매칭, 레코드, sealed 클래스 등 새로운 기능을 도입하여 코드 표현력을 높였다. 나름 최신 버전의 자바를 사용하는 프로그램은 보통 이 자바 17을 사용한다.

### 주요 특징

아래는 자바 17의 주요 특징이다.

### 1. 레코드 (Record Classes)

- 데이터를 담는 DTO 용도로 매우 유용, 불변(immutable) 객체를 쉽게 선언 가능하다. 아주 유용한 기능이다. 지금까지 class로 리턴받던 객체를 record로 선언하여 자주 사용한다. **현재 진행중인 프로젝트에서 이 record를 자주 사용하는데, 유용하고 자주 사용하는 기능이다.**

```java
public record Person(String name, int age) {}

Person p = new Person("TEST", 30);
System.out.println(p.name()); // TEST
```

### 2. 패턴 매칭 (Pattern Matching)

- instanceof와 switch 문에서 타입 체크 및 캐스팅 간소화 했다.

```java
if (test instanceof String s) {
    System.out.println(s.toUpperCase());
}
```

### 3. Sealed 클래스

- 상속 구조 제한 가능, 클래스 계층 안전성 강화
- 상속을 보다 안전하게 관리할 수 있는 기능이다.

```java
public sealed class Shape permits Circle, Rectangle {}
public final class Circle extends Shape {}
public final class Rectangle extends Shape {}
```

| 키워드 | 의미 |
|--------|------|
| `final` | 더 이상 상속 불가 |
| `sealed` | 다시 `permits`로 하위 클래스 제한 가능 |
| `non-sealed` | 제한 없이 상속 가능 (sealed 부모를 가진 서브클래스지만 자유로운 상속 허용) |

### 4. Java 16~17 LTS 기능 통합

- switch expression 개선, text blocks, foreign function interface 실험적 기능 등을 통합했다.

### 5. Garbage Collector 개선

- G1 GC 기본, ZGC와 Shenandoah 옵션 제공, 메모리 효율 향상

### 6. 보안 및 성능 개선

- TLS 1.3 기본, JVM 성능 최적화, JIT 컴파일러 성능이 개선되었다.

## Java 21

**출시 연도:** 2023

**설명:** Java 21은 최신 LTS 버전으로 Java 17을 기반으로 한 개선 버전이며, 특히 Virtual Thread(가벼운 스레드)를 본격적으로 지원하여 동시성 프로그래밍을 크게 단순화한다.

### 주요 특징

아래는 자바 21의 주요 특징이다.

### 1. Virtual Threads (프로젝트 Loom)

- 수천~수만 개의 가벼운 스레드를 효율적으로 생성/관리 가능하다.
- 기존 스레드 기반 코드 대부분을 거의 변경 없이 사용 가능하다.

**자바 21하면 떠오르는 가장 큰 변화점이자, 잘 사용하면 엄청난 효율을 뽑아내는 기술이다.**

```java
Thread.startVirtualThread(() -> System.out.println("virtualthread_test"));
```

### 2. Structured Concurrency

- 병렬/동시 작업을 구조화하여 오류 처리와 리소스 관리를 쉽게 해준다.

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<String> result = scope.fork(() -> "Hello");
    scope.join();
}
```

### 3. String Templates

- 문자열 내 변수 표현 및 formatting 간소화

간단하게, 파이썬 혹은 c++같은 다른 언어에서 사용하던 기능이 추가되었다.

```java
String name = "TEST";
int age = 30;

String message = STR."Hello, my name is \{name} and I am \{age} years old.";
System.out.println(message);
```

이런 식으로 스트링 구문 내에 문자 및 구문 표현식을 삽입할 수 있게 되었다.

### 4. Record 패턴 확장 및 Pattern Matching 개선

- switch 패턴에서 record 분해 가능

### 5. Garbage Collector 개선

- ZGC와 Shenandoah 계속 개선, 짧은 지연 시간 지원

### 6. 보안/성능

- Java 17 대비 성능 및 GC 효율 개선, TLS, Unicode 등 최신 표준 지원

## Java LTS 버전 비교 요약

| 구분 | Java 8 | Java 11 | Java 17 | Java 21 |
|------|--------|---------|---------|---------|
| 출시 연도 | 2014 | 2018 | 2021 | 2023 |
| LTS | 예 | 예 | 예 | 예 |
| Lambda & Stream | 도입 | 유지 | 유지 | 유지 |
| Optional | 도입 | 유지 | 유지 | 유지 |
| HTTP Client | HttpURLConnection | java.net.http.HttpClient | 유지 | 유지 |
| Local-Variable Type Inference | 없음 | var | 유지 | 유지 |
| Record | 없음 | 없음 | 도입 | 유지/확장 |
| Pattern Matching | 없음 | 없음 | 일부 | 개선/확장 |
| Virtual Thread | 없음 | 없음 | 없음 | 도입 |
| GC | Parallel, CMS | G1 기본, ZGC 선택 | G1/ZGC 개선 | G1/ZGC 개선, 낮은 지연 |
| String 기능 | - | isBlank, lines, strip, repeat | 유지 | 유지 |
| 기타 | Optional, Stream | toUnmodifiableList, TLS1.3 | Sealed 클래스, switch expression | Structured Concurrency, String Templates |

## 프로젝트 자바 버전 선택 가이드

### 1. LTS(Long Term Support) 우선

실무에서는 **안정성과 장기 지원**이 가장 중요하다. 따라서 **LTS 버전(8, 11, 17, 21)** 중심으로 선택하는 것이 바람직하다.

### 2. 팀·회사 환경 고려

프로젝트에서 사용할 자바 버전은 **기존 시스템 환경, 레거시 호환성, 라이브러리 지원 여부**를 반드시 고려해야 한다.

- **공공기관 및 금융업**: 여전히 **Java 8**이 가장 많이 사용된다.
- **기존 시스템과 연계가 필요한 프로젝트**라면, 호환성과 안정성을 위해 **Java 8 또는 11**을 선택하는 것이 안전하다.

### 3. 업계 표준 및 신규 프로젝트

현재 업계 표준은 **Java 17**로 굳혀지는 추세이다.

스타트업과 신규 서비스, 최신 시스템 구축 프로젝트에서 활발히 적용되고 있으며, 장기적으로도 안정성이 검증된 버전이다.

한편, 최신 LTS인 **Java 21**이 등장하면서 성능과 기능 면에서 Java 17을 능가하고 있다. 특히 자바의 특성상 **상위 버전은 대부분 하위 버전과 호환**되므로, 신규 프로젝트라면 **Java 21 채택을 적극 추천**한다.

### 4. 요약

- **레거시 유지보수**: Java 8 / 11
- **안정성과 호환성 중시 신규 프로젝트**: Java 17
- **최신 기능 활용, 장기적 관점**: Java 21

> **Note**
> 
> 낮은 버전을 선택했다고 해서 큰 문제가 발생하지는 않는다.
> 
> 다만 높은 버전의 장점을 활용하지 못할 뿐이며, 오히려 **높은 버전 선택이 문제를 일으키는 경우는 거의 없다고 생각한다.**
> 
> **위는 일반적 관점이고, 필자는 버전의 낮은 자바 시스템에서 프로젝트를 진행하더라도 업그레이드가 선행되는 일이 있더라도 가능한 한 높은 버전의 자바를 선택하는 일을 추천한다. (자바 21)**

## 버전별 특징 요약

| 버전 | 지원 상태 | 주요 특징 | 권장 사용처 |
|------|-----------|----------|-------------|
| **Java 8** | LTS (구버전) | 가장 널리 사용, 안정적이나 최신 기능 부족 | 레거시 시스템 유지보수, 공공/금융 기관 |
| **Java 11** | LTS | 모듈 시스템 안정화, JDK 정리 | 기존 시스템 확장, 호환성 중요 프로젝트 |
| **Java 17** | LTS (현재 업계 표준) | 최신 표준, 성능 및 기능 개선, 안정성 검증됨 | 신규 프로젝트, 스타트업, 업계 표준 따라갈 때 |
| **Java 21** | 최신 LTS | Java 17 대비 성능·기능 향상, 장기 지원 예정 | 신규 프로젝트, 장기 운영 서비스, 최신 기능 활용 |

## 자바 선택 최종 요약

**자바 21을 강력히 추천한다. 환경상 자바 8, 11 만 가능할 경우라도 업그레이드를 진행해서라도 자바 21을 추천한다.**

**이 모든 글은 필자의 의견입니다.**

