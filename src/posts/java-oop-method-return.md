## 메서드의 선언과 구현

자바 클래스의 메서드는 크게 선언부(header)와 구현부(body)로 이루어져 있다.

메서드 선언부는 메서드의 이름, 매개변수의 선언, 그리고 반환 타입으로 구성되어 있다. 메서드는 작업을 수행하기 위해 어떤 값들을 필요로 하고 작업의 결과로 어떤 타입의 값을 반환하는지에 대한 정보를 제공한다.

선언부는 후에 변경사항이 생기지 않도록 아주 신중하게 작성해야 한다. 메서드의 선언부를 변경해야 할 경우, 그 메서드를 호출하는 모든 부분을 변경해야 한다.

메서드의 선언부에는 메서드에 활용되는 매개변수가 선언되고, 메서드의 이름이 선언되며 반환 타입이 함께 선언된다. 그리고 메서드의 구현부에는 메서드의 로직이 들어간다. 그리고 이 구현부의 마지막에 void가 아닐 경우 return 값이 메서드의 return 값을 정해준다.

```java
@Transactional
public void updateTicket(RequestVO requestVO) {
    long seq = requestVO.getSeq();
    WishTicket wishTicket = wishRepository.findById(seq)
            .orElseThrow(() -> new IllegalArgumentException("Invalid ID: " + seq));
    String comment = !StringUtils.isEmpty(requestVO.getComment()) ?
            requestVO.getComment() : "";

    if(!"".equals(comment))
        wishTicket.setComment(comment);

    wishTicket.setTicketStatus(TicketStatus.fromValue(requestVO.getProcessState()).toString());
    wishTicket.setModifiedDate(LocalDateTime.now().toString());

    WishHistory wishHistory = new WishHistory();
    wishHistory.setTicketSeq(seq);
    wishHistory.setCurrentState(TicketStatus.fromValue(requestVO.getCurrentState()).toString());
    wishHistory.setProcessStatus(TicketStatus.fromValue(requestVO.getProcessState()).toString());
    wishHistory.setProcessDate(LocalDateTime.now().toString());
    wishHistory.setProcessComment(comment);
    wishHistoryRepository.save(wishHistory);
}
```

티켓 하나를 업데이트 하는 메서드의 선언부 및 구현부이다. 티켓을 업데이트 한 후, 리턴을 시켜줄 필요가 없기에 return 문은 작성하지 않았다. 또한, 그 이후의 로직에 대해서 적어주어 메서드를 통해 티켓 상태가 저장되고, 티켓 히스토리가 저장되도록 로직이 구현되어 있다.

## 메서드의 호출

메서드를 정의했어도, 호출하지 않으면 아무 일도 일어나지 않는다. 메서드를 호출해야만 저 위에 작성된 코드와 같은 구현부의 일들이 일어난다. 메서드를 호출할 때는 인자와 매개변수가 일치해야 호출이 된다.

```java
@RequestMapping("/updateTicket.do")
public boolean updateTicket(@ModelAttribute RequestVO requestVO) {
    System.out.println("updateTicket");
    try {
        wishService.updateTicket(requestVO);
        System.out.println("Success");
        return true;
    } catch(Exception e) {
        e.printStackTrace();
        System.out.println("Fail");
    }
    return false;
}
```

Spring에서 실제 저 메서드를 호출한 후 update하는 구문을 적은 컨트롤러 단 로직이다. 형식에 맞는 매개변수와 선언되어 있는 service를 호출하여 메서드를 호출했고, 성공했을 경우 true를 리턴해주는 로직이다.

## return 문

return 문은 현재 실행중인 메서드를 종료하고 호출한 메서드로 되돌아간다. void로 만들어진 경우, return 문이 자동으로 뒤쪽에 추가된다고 생각하면 된다.

## JVM의 메모리 구조

응용 프로그램이 실행되면, JVM은 시스템으로부터 프로그램이 수행하는 데 필요한 메모리를 할당받고 이 메모리를 여러 영역에 맞추어 구분한다. 이 영역은 총 3가지가 있는데,

### 1. 메서드 영역

- 프로그램이 실행 중 어떤 클래스가 실행되면 JVM은 해당 클래스의 클래스파일을 읽어 클래스에 대한 정보를 이곳에 저장한다.

### 2. 힙 영역

- 인스턴스가 생성되는 공간으로 프로그램 실행 중 생성되는 인스턴스는 모두 이곳에 생성된다.

### 3. 스택 공간

- 메서드의 작업에 필요한 메모리 공간을 제공한다. 메서드가 호출되면, 호출스택에 호출된 메모리가 할당되며 이 메모리는 메서드가 작업을 수행하는 동안 필요한 여러 지역변수와 연산의 저장공간으로 사용된다. 메서드가 작업을 마칠 시 이 공간 역시 반환된다.

각 메서드별의 저장공간은 서로 구별되며, 처음으로 호출된 메서드를 위한 작업공간은 스택 영역의 가장 아래에 위치하며 다른 메서드를 호출 시 스택 메모리의 위 공간에 메서드의 영역이 저장된다. 호출스택의 제일 상위에 위치한 메서드가 현재 수행되는 메서드이며, 나머지는 대기상태로 대기한다. 상위 상태의 메서드가 return을 통해 값을 반환하면 그 하위 메서드는 값을 받은 후 나머지 작업을 수행한다.

## 기본형 매개변수와 참조형 매개변수

자바에서는 메서드를 호출할 때 매개변수로 지정한 값을 메서드의 매개변수에 복사해서 넘겨준다. 매개변수의 타입이 기본형일 때는 기본형 값이 복사되고, 참조형일 경우에는 인스턴스의 주소가 복사되어 넘겨준다.

기본형 매개변수는 변수의 값을 읽기만 할 수 있지만,

참조형 매개변수는 변수의 값을 읽고 변경할 수 있다.

이 부분은, 기본형 매개변수의 경우 값 자체를 저장하기 때문에 메서드에 불러 값을 변경해도 원본의 값에는 영향을 끼치지 않는다. 하지만, 참조형 매개변수는 메서드 자체가 아닌 주소를 다루기에, 변경된 값을 주소에 참조하여 새로운 값을 넣을 수 있다.

```java
class Struct {
    int x;
}

public class Main {
    public static void main(String[] args) {
        Struct str = new Struct();
        str.x = 10;
        System.out.println("main() : x = " + str.x);
        change(str.x);
        System.out.println("after change : " + str.x);
    }
    
    static void change(int x) {
        x = 1000;
        System.out.println("change : " + x);
    }
}
```

간단한 예제 코드를 작성해보았다. change 함수를 통해 구조체 Struct의 변수 x 값을 1000으로 변경했지만, 실제로는 적용되지 않는 모습을 볼 수 있다.

![기본형 매개변수 실행 결과](https://velog.velcdn.com/images/honggilgim/post/17000cd0-65e5-4488-a504-22068a5de718/image.png)

실행 결과로도 적용되지 않은 모습을 볼 수 있다. 하지만 여기에 참조형 매개변수로 넣으면 어떻게 될까?

```java
class Struct {
    int x;
}

public class Main {
    public static void main(String[] args) {
        Struct str = new Struct();
        str.x = 10;
        System.out.println("main() : x = " + str.x);
        change(str);
        System.out.println("after change : " + str.x);
    }

    // 참조형 매개변수를 넣었다.
    static void change(Struct str) {
        str.x = 1000;
        System.out.println("change : " + str.x);
    }
}
```

![참조형 매개변수 실행 결과](https://velog.velcdn.com/images/honggilgim/post/18a36c40-6d83-49d9-a290-a2f99bc08c86/image.png)

참조형 매개변수로 넣을 경우 값이 변경되어 들어가는 모습을 확인할 수 있다.

이것은 **값 자체를 받는 기본형 매개변수**와 **주소가 들어오는 참조형 매개변수**의 차이다. 기본형 매개변수에는 값을 변경해봤자 기존의 값에 영향을 미치지 못하지만, 참조형 매개변수는 값을 변경할 시 기존의 주소에도 영향을 끼쳐 값 자체를 변경시킨다.

## 참조형 반환타입

매개변수 뿐 아닌, 반환 타입 역시 참조형으로 반환이 가능하다.

일반 기본형 매개변수의 반환타입과의 차이점은, 참조형 매개변수는 참조형 객체 자체를 리턴한다는 점을 들 수 있다. 그냥 간단하게 메서드가 객체의 주소를 반환한다고 생각하면 된다.

