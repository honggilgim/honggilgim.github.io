# 자바 Wrapper Class

자바에서 코딩을 하기 위해 List를 선언하거나, 혹은 자료형에 맞게 변수를 바꾸어 사용하기 위해 우리는 Wrapper Class 를 사용하곤 한다.

```java
String number = "33";

int A = 3;

// int to String
String AtoString = String.valueof(A);

// String to int
int numbertoInt = Integer.valueof(number);

// Array List 선언 - int
ArrayList<Integer> numbers = new ArrayList<Integer>();

//Array List 선언 - String
ArrayList<String> strs = new ArrayList<String>();
```

이처럼 여러 가지 선언 혹은 변수를 변환할 때 우리는 Integer, String 과 같은 Wrapper Class 를 사용하곤 한다.

코딩을 하던 중 저 Wrapper Class에 대해 묻는 말이 나왔는데, 자세히 알지 못해 이렇게 공부하여 글을 남긴다.

## Wrapper Class

Wrapper Class 는 총 8가지 종류를 가졌다.

- byte→Byte
- short→Short
- int→Integer
- long→Long
- double→Double
- char→Character
- float→Float
- boolean→Boolean

이 Wrapper Class 는 간단하고 기억하기 좋게 요약하면,

_기본 자료형을 객체형으로 감싸 만들어낸 자료형이다._ 

즉 객체다. 그렇기 때문에 여러가지 메소드가 들어간다. 이곳에서 또 하나의 특징이 있는데, 기본적으로 Wrapper Class의 값은 변하지 않는다.

우리가 이 Wrapper Class를 자주 사용하면서도 잘 알 수 밖에 없는 중요한 개념이 있는데, 이것이 바로 **boxing, unboxing** 이다. 

_boxing 은 기본 자료형을 Wrapper Class로

unboxing은 Wrapper Class 를 기본 자료형으로 바꾸어준다._

JAVA 5에서부터 기능을 추가해 그 이후부터는 boxing 과 unboxing을 자동으로 지원해주기에, 우리는 Wrapper Class에 대해 잘 모르더라도 사용할 수 있게 되었다.

```java
Integer num1 = Integer.valueof(1);

// num1이라는 Wrapper Class 의 객체 자료형이, int 라는 기본 자료형으로 들어간다.
int num2 = num1;
```

이런 변환이 가능하다.

