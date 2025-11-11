## 1. 개요

회사에서 대용량 데이터 처리를 진행할 일이 생겨, 병렬 처리에 관해 공부하고 이를 구현해 글로 정리해서 남긴다.

## 2. 병렬 처리란?

병렬 처리는 멀티 코어 환경에서 하나의 작업을 분할해 각각의 코어가 병렬적으로 처리하는 작업이다. 

자바 7 이전에서는 직접 스레드를 생성해 병렬 처리를 진행했다면, 자바 8 이후부터 컬렉션을 데이터 스트림으로부터 쉽게 반복할 수 있는 **Stream API**를 도입해 병렬 실행 및 프로세스 코어 사용이 매우 쉬워졌다. 

회사에서 사용하는 병렬 처리 코드의 포맷이 **ForkJoinPool**이므로, 이에 맞춰 알아보도록 한다.

## 3. 순차 스트림과 병렬 스트림의 차이

### 일반 스트림 (순차 처리)

```java
// java 일반 스트림

List<String> testList = new ArrayList<>();

String firstIndex = "1";
String secondIndex = "2";
String thirdIndex = "3";
String fourIndex = "4";

testList.add(firstIndex);
testList.add(secondIndex);
testList.add(thirdIndex);
testList.add(fourIndex);

testList.stream().forEach(index -> {
	System.out.println("test : " + index); 
});
```

해당 코드로 실행할 경우, 우리가 아는 것처럼 순차적으로 **1, 2, 3, 4**가 출력된다. 

하지만 병렬 스트림으로 출력할 경우, 우리가 결정하는 수 있는 것이 아닌 프로그램이 이를 결정하게 된다.

### 병렬 스트림

```java
// java 병렬 스트림

List<String> testList = new ArrayList<>();

String firstIndex = "1";
String secondIndex = "2";
String thirdIndex = "3";
String fourIndex = "4";

testList.add(firstIndex);
testList.add(secondIndex);
testList.add(thirdIndex);
testList.add(fourIndex);

testList.parallelStream().forEach(index -> {
	System.out.println("test : " + index + " thread : " + Thread.currentThread().getName()); 
});
```

이렇게 출력할 경우 전부 섞여서 결과가 출력된다.

## 3-1. 병렬 스트림 Fork-Join Pool

자바에서 **Fork-Join Framework**는 작업자 스레드 간에 소스 데이터를 분할하고 작업 완료시, 이를 콜백으로 처리하는 역할을 한다.

Thread Pool을 생성해 여러 작업을 병렬적으로 수행할 수 있다. **ForkJoinPool**은 Task의 크기에 따라 분할(**Fork**) 하고, 분할된 Task가 처리되면 그것을 합쳐(**Join**) 리턴해준다.

작업이 있을 때, **Fork** 작업을 통해 나누고, **Join** 작업을 통해 결과를 합친다.

### Fork

![Fork](https://velog.velcdn.com/images/honggilgim/post/2718be5c-3d07-40fa-88bc-6e81f47c7221/image.png)

Task를 분할해서 다른 스레드에서 처리시키는 작업이다.

### Join

![Join](https://velog.velcdn.com/images/honggilgim/post/4fb53007-27ef-431f-8315-bf28d64c604f/image.png)

작업 결과를 합친다.

## 4. 예제

Java의 `parallelStream`은 내부적으로 **ForkJoinPool**을 사용한다. 하지만, 명시적으로 선언한 후 사용되곤 하고 우리 회사에서도 그렇게 사용했는데 이는 **thread의 수를 지정하여 병렬처리**하기 위함이다.

```java
ForkJoinPool pool = new ForkJoinPool(15);

// 값은 들어있다고 가정
List<String> orderList = .....

orderList = pool.submit(() -> {
	return orderList
		.parallelStream()
		.map(x -> {
			//... 내부 로직
		}).collect(// ... 내부 로직);
}).get();
```

의 형태로 작동하곤 한다.
