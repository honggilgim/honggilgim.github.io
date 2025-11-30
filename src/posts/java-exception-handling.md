## 예외처리

### 프로그램 오류

예외는 발생시점에 따라 크게 두가지 컴파일 에러와 런타임 에러로 발생할 수 있다. 컴파일 에러는 **컴파일 시점에 발생되는 에러**이고 **프로그램 실행 도중에 발생되는 에러는 런타임 에러**이다. 그리고 논리적 에러는, **프로그램이 의도한 바와 다르게 작동하는 것**을 말한다.

- **컴파일 에러**: 컴파일 시 발생하는 에러
- **런타임 에러**: 실행 시에만 발생하는 에러
- **논리적 에러**: 실행은 되지만, 의도와는 다르게 발생하는 에러

컴파일이 완벽하게 되었다고 해서 프로그램이 정상적으로 작동하지는 않는다. 런타임 에러는, **프로그램 실행 후 프로그램 자체에서 에러가 발생하는 현상**이다. 자바에서는 실행 시 발생할 수 있는 프로그램 오류를 에러와 예외 두 가지로 구분했다.

1. **에러**: 일단 발생하면 복구할 수 없다. 프로그램 코드에 의해서 수습될 수 없는 심각한 오류. ex - 메모리 부족, 스택 오버플로우

2. **예외**: 발생하더라도 적절한 코드를 작성함으로써 프로그램의 비정상적인 종료를 막을 수 있다. 프로그램 코드에 의해서 수습될 수 있는 다소 미약한 오류

## 예외 클래스의 계층 구조

자바에서는 실행 시 발생할 수 있는 오류를 클래스로 정의한다. 모든 예외의 최고 조상은 Exception 클래스이고 이 하위에 다양한 오류들이 상속되어 두 가지로 나누어진다.

Exception 하위에는 IOException, ClassNotFoundException등의 오류가 있고 크게 RuntimeException으로 구분되는 큰 종류의 예외가 존재한다.

- **Exception 계열 예외**: 사용자의 실수에 의해 발생하는 예외
- **RuntimeException 계열 예외**: 프로그래머의 실수에 의해 발생하는 예외

## try-catch 문

프로그램 실행 시 발생할 수 있는 예기치 못한 예외에 대비하는 코드를 작성하는 것이다. 이 예외처리로 예외의 발생으로 인한 프로그램의 비정상적인 종료를 막고, 정상적인 실행상태를 유지할 수 있도록 한다.

```java
try {
    for (int i = 0; i < roop; i++) {
        wishService.insertTicket(comment);
    }
    return true;
} catch (Exception1 e1) {
    e1.printStackTrace();
} catch (Exception2 e2) {
    e2.printStackTrace();
} catch (Exception3 e3) {
    e3.printStackTrace();
}
```

하나의 try 구문에는 여러 종류의 예외를 처리할 수 있도록 catch 블록을 만들 수 있다. 이 중 발생한 예외의 종류에 걸맞는 단 하나의 Exception만을 처리하며 이 catch 블록이 없으면 예외는 처리되지 않는다.

try catch 구문은 try블럭에서 예외가 발생하는 경우에만 발생한 예외와 일치하는 catch 구문을 찾고 그 후 catch 블럭 안에 있는 문장들을 수행한 후 try catch를 빠져나가 그 후의 구문들을 계속해서 실행한다. 예외가 발생하지 않을 경우 catch 구문을 실행하지 않고 계속해서 진행된다.

Exception 클래스는 모든 예외의 상위 클래스이므로, `Exception e`로 선언할 경우 모든 예외가 해당하는 catch 문에 들어간다. 그 위의 다른 Exception의 경우 해당 Exception으로 수행된다.

## throw 구문

Exception을 throw를 통해 던질 수 있다. 보통

```java
throw new Exception("error");

// 혹은

Exception e = new Exception("error");
throw e;
```

로 에러를 발생시키는데, 이 구문은 예외 처리를 할 때 많이 사용하는 구문이다.

## 예외 자체를 메서드에 선언하기

보통 예외는 메서드 자체에 선언하여 사용하는 경우가 많다. 예외가 여러 개일 경우는 쉼표로 선언하고, 모든 Exception의 조상인 Exception 클래스로 선언할 경우 모든 종류의 예외가 발생할 수 있다는 것이다. 메서드의 선언부에는 보통 Exception 클래스로 선언을 많이들 하는데, 이 경우에는 어떤 예외를 신경써야 하는지 헷갈릴 수 있다.

```java
@RequestMapping("/insertTicket.do")
public Boolean insertTicket(@RequestParam(defaultValue = "1", name = "count") String count,
                         @RequestParam(defaultValue = "", name = "comment") String comment) throws RuntimeException {
    int roop = Integer.parseInt(count);
    try {
        for (int i = 0; i < roop; i++) {
            wishService.insertTicket(comment);
        }
        return true;
    } catch (Exception e) {
        e.printStackTrace();
    }
    return false;
}
```

실제 메서드에 RuntimeException을 선언한 클래스이다. 이런 식으로 예외를 선언하여, 예외가 발생할 수 있게 한다.

## finally 구문

finally 블럭은 예외의 발생 여부와 상관없이 실행되어야 할 코드를 포함시킬 목적으로 사용된다. try catch 구문의 끝에 선택적으로 덧붙여 사용할 수 있고, 이는 try catch finally 구문의 순서로 구성된다.

```java
try {
    // try 구문
} catch(Exception e) {
    // Exception 구문
} finally {
    // finally 구문
}
```

finally 구문은 예외의 발생 여부와 상관없이 항상 실행된다.

## 사용자정의 Exception

사용자 정의 Exception은 기존에 정의된 예외 클래스가 아닌, 프로그래머가 새로운 예외를 정의하여 사용하는 것을 말한다.

메시지를 담게 하려면 String 값을 받는 생성자를 필수적으로 만들어주어야 한다.

```java
class AException extends RuntimeException {
    AException(String msg) {
        super(msg); // 조상 생성자 호출
    }
    
    AException(String msg, int errCode) {
        super(msg);
        ERR_CODE = errCode;
    }
}
```

Exception 클래스의 정의에 들어가면 조금 더 자세히 볼 수 있고, 주로 사용하는 RuntimeException을 넣어 추가했다. 스프링에서는 주로 `@RestControllerAdvice`라는 어노테이션이나, `@ExceptionHandler`와 사용하여 예외 공통처리에 사용되는데, 아주 유용한 기능이다.

## checkedException, uncheckedException

checkedException은, **RuntimeException을 제외한 나머지 Exception 클래스의 하위 클래스들로 반드시 처리되어야 하는 예외**를 의미한다. uncheckedException은 **처리하지 않아도 되는 예외**들을 의미한다.

checkedException은 반드시 처리되어야 하므로 try catch구문으로 구문 자체를 감싸주어야 한다. 하지만, uncheckedException은 반드시 처리하지 않고 선택적으로 예외를 처리할 수 있게 된다.

checkedException을 uncheckedException으로 만드는 방법은 간단하다.

```java
throw new RuntimeException(new MemoryException("ERROR"));
```

위와 같은 형식으로 RuntimeException으로 감싸 uncheckedException으로 만들어버리면 된다. 이것은 한 예외가 다른 예외를 발생시키는 자바의 프로그래밍 기법을 이용한 것이다.

