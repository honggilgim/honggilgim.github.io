## 추상 클래스(abstract class)

추상 클래스는, 미완성 메서드를 포함한 클래스이다. 이 추상클래스는 상속을 통해 자손을 상속받는 것에 의해서만 완성될 수 있다.

추상클래스 자체로는 클래스로서의 역할을 하지 못하지만, 새로운 클래스를 작성하는 데 있어서 바탕이 되는 조상클래스로의 의미를 가진다. 추상 클래스는 추상 메서드를 포함하고 있다는 것을 제외하곤, 기존의 메서드와 아무 차이도 없다.

### 추상 메서드(abstract method)

메서드는 선언부와 구현부로 이루어져 있다. 선언부는 작성하고, 구현부는 작성하지 않은 것이 곧 추상 메서드이다. 즉, 설계만 해 놓고 실제 수행될 내용은 작성하지 않았기 때문인 미완성 메서드이다.

메서드를 이와 같이 미완성 상태로 남겨 놓는 이유는, 메서드의 내용이 상속받는 클래스에 따라 충분히 달라질 수 있기 때문이다. 조상 클래스에서는 선언부만 작성하고 상속받는 클래스에서 이를 구현한다.

추상클래스로부터 상속받는 자손 클래스는 오버라이딩을 통해 조상인 추상클래스의 추상 메서드를 모두 작성해주어야 한다. 만일 조상으로부터 상속받은 추상메서드 중 하나라도 구현하지 않는다면, 자손클래스 역시 추상클래스로 작성해 주어야 한다.

이렇게 작성하는 이유는, 메서드를 작성할 때는 일반적인 구현부보다 선언부를 더 중요하게 여기기 때문이다. 메서드의 이름과 메서드의 작업에 필요한 매개변수, 그리고 작업의 결과로 어떤 타입의 값을 반환할 것인지 결정하는 것은 어렵기에 메서드만 미리 작성해서 추상 클래스를 작성하곤 한다.

### 추상 클래스의 작성

> 추상 : 낱낱의 구체적 표상이나 개념에서 공통된 성질을 뽑아 이를 일반적인 개념으로 파악하는 정신 작용

여러 클래스의 공통적으로 사용될 부분을 미리 작성하거나, 기존의 클래스의 공통적인 부분을 뽑아서 추상 클래스로 만들어 상속하도록 하는 경우 이렇게 2가지 경우가 존재한다.

상속이 자손 클래스를 만드는데 조상 클래스를 사용하는 것이라면, 이와 반대로 **추상화는 기존 클래스의 공통 부분을 뽑아 조상 클래스를 만드는 일**이다.

- **추상화**: 클래스간의 공통점을 찾아내어 공통의 조상을 만드는 작업
- **구체화**: 상속을 통해 클래스를 구현, 확장하는 작업

추상화 abstract를 통해 클래스를 만드는 이유는 자손의 클래스에서 추상 클래스의 메서드를 반드시 구현하도록 강요하기 위해서이다. 추상 메서드로 선언된 메서드들은 자손 클래스가 상속받을 시 꼭 구현하도록 강제한다.

## 인터페이스

### 인터페이스란?

인터페이스는 일종의 추상 클래스이다. 추상클래스처럼 추상 메서드를 갖지만 추상클래스보다 추상화 정도가 높다. 인터페이스는 추상 클래스와 달리 몸통만 갖춘 일반 메서드 또는 멤버변수를 구성원으로 가질 수 없다. 오직 추상 메서드와 상수만을 멤버로 가질 수 있다. 인터페이스는 다른 클래스를 작성하는 데 도움을 주는 목적으로 형성된다.

### 인터페이스의 작성

인터페이스는 클래스를 작성하는 것과 같다. 다만 키워드로 class 대신 interface로 작성한다.

```java
interface Test {
    public static final 타입 상수이름 = 값;
    public abstract 메서드이름(매개변수 목록);
}
```

인터페이스 멤버들은,

- 모든 멤버변수는 public static final 제어자가 들어가며 이를 생략할 수 있다.
- 모든 메서드는 public abstract이어야 하며, 이를 생략할 수 있다.

라는 2가지 제약사항을 가진다. 편의상 생략 가능하다.

예:

```java
package com.example.wish.wishTicket.Service;

import com.example.wish.wishTicket.Entity.WishHistory;
import com.example.wish.wishTicket.Entity.WishTicket;
import com.example.wish.wishTicket.VO.RequestVO;

import java.util.List;

public interface WishService {
    public List<WishTicket> selectWishTicekbyticketStatus(String ticketStatus);
    
    public long countByTicketStatus(String ticketStatus);
    
    public void insertTicket(String comment);
    
    public List<WishTicket> findAll();
    
    public Long countAll();
    
    public void uodateTicket(RequestVO requestVO);
    
    public void deleteTicket(Long seq);
    
    public List<WishHistory> findHistoryAll();
    
    public List<WishHistory> selectHistroyList(long id);
}
```

실제 인터페이스의 예제 코드이다. 이런 식으로 작성한다. (public abstract 컴파일러가 자동으로 붙여준다. 편의상 public만 작성했다.)

자바 8 이후로는 static 메소드와 default 메서드가 추가가 가능해졌다.

### 인터페이스의 상속

인터페이스는 인터페이스로부터만 상속이 가능하다. 또한, 클래스와는 다르게 다중 상속이 가능하다. 상속받을 경우 조상 인터페이스로부터 정의된 멤버를 모두 상속받는다.

### 인터페이스의 구현

인터페이스 역시 추상 클래스처럼 그 자체로는 인스턴스 생성이 불가능하며, 몸통을 만들어주는 클래스를 작성해야 한다. 이 때 상속인 extends가 아닌, implements를 사용한다.

예시:

```java
package com.example.wish.wishTicket.Service.impl;

import com.example.wish.Enum.TicketStatus;
import com.example.wish.wishTicket.Repository.WishHistoryRepository;
import com.example.wish.wishTicket.Repository.WishRepository;
import com.example.wish.wishTicket.Service.WishService;
import com.example.wish.wishTicket.Entity.WishHistory;
import com.example.wish.wishTicket.Entity.WishTicket;
import com.example.wish.wishTicket.VO.RequestVO;
import com.example.wish.wishTicket.util.hashUtil;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class WishServiceImpl implements WishService {
    private final WishRepository wishRepository;
    private final WishHistoryRepository wishHistoryRepository;

    public WishServiceImpl(WishRepository wishRepository, WishHistoryRepository wishHistoryRepository) {
        this.wishRepository = wishRepository;
        this.wishHistoryRepository = wishHistoryRepository;
    }

    public List<WishTicket> selectWishTicekbyticketStatus(String ticketStatus) {
        return wishRepository.findByTicketStatusOrderByModifiedDate(ticketStatus);
    }

    public long countByTicketStatus(String ticketStatus) {
        return wishRepository.countByTicketStatus(ticketStatus);
    }

    @Transactional
    public void insertTicket(String comment) {
        WishTicket newTicket = new WishTicket();
        newTicket.setTicketStatus(TicketStatus.ISSUED.name());
        newTicket.setModifiedDate(LocalDateTime.now().toString());
        newTicket.setComment(comment);
        newTicket.setTicketId(formatString(hashUtil.
                generate12CharHashWithBase64(LocalDateTime.now().toString())));
        // save() 메소드를 통해 새로운 엔티티를 저장
        newTicket = wishRepository.save(newTicket);

        WishHistory wishHistory = new WishHistory();
        wishHistory.setTicketSeq(newTicket.getSeq());
        wishHistory.setProcessStatus(newTicket.getTicketStatus());
        wishHistory.setProcessDate(newTicket.getModifiedDate());
        wishHistory.setProcessComment("티켓 최초 생성");
        wishHistoryRepository.save(wishHistory);
    }

    public List<WishTicket> findAll() {
        return wishRepository.findAll();
    }

    public Long countAll() {
        return wishRepository.count();
    }

    public static String formatString(String input) {
        // 입력이 12자리 이상이어야 한다는 가정
        if (input == null || input.length() != 12) {
            throw new IllegalArgumentException("Input must be exactly 12 characters long.");
        }

        // 소문자를 대문자로 변환
        String upperCaseString = input.toUpperCase();

        // 4자리마다 -를 추가
        StringBuilder formattedString = new StringBuilder();
        for (int i = 0; i < upperCaseString.length(); i++) {
            // 4자마다 "-"를 삽입
            if (i > 1 && i % 4 == 0) {
                formattedString.append("-");
            }
            formattedString.append(upperCaseString.charAt(i));
        }

        return formattedString.toString();
    }

    @Transactional
    public void uodateTicket(RequestVO requestVO) {
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

    @Transactional
    @Override
    public void deleteTicket(Long seq) {
        wishRepository.deleteById(seq);
        wishHistoryRepository.deleteByTicketSeq(seq);
    }

    public List<WishHistory> findHistoryAll() {
        return wishHistoryRepository.findAll();
    }

    public List<WishHistory> selectHistroyList(long id) {
        return wishHistoryRepository.findWishHistoryByTicketSeqOrderByProcessStatusDesc(id);
    }
}
```

메서드 중 일부만 구현한다면 abstract를 붙여야 한다.

상속과 구현을 동시에 하는 일 역시 가능하다. (extends와 implements가 동시 사용이 가능하다.)

## 인터페이스를 이용한 다형성

자손클래스의 인스턴스를 조상타입의 참조변수로 참조하는 것은 가능하다. 인터페이스 역시 클래스의 조상이므로, 이를 해당 인터페이스 타입의 참조변수로 참조하는 일은 가능하며, 인터페이스 타입으로의 형변환 역시 가능하다.

```java
InterFaceParentsClass p = (InterFaceParentsClass) new InterFaceChildClass();

// or

InterFaceParentsClass p = new InterFaceChildClass();
```

인터페이스는 그래서 특정 메서드의 매개변수로 활용이 가능하다.

```java
InterFaceParentsClass childMethod(InterFaceParentsClass p) {
    ...
    InterFaceChildClass c = new InterFaceChildClass();
    return c;
}
```

인터페이스 타입의 매개변수는 인터페이스를 받는 것이 아닌 인터페이스를 상속받아 구현한 클래스의 인스턴스를 매개변수로 제공해야 한다는 의미이다.

또한, 리턴 타입에 인터페이스가 선언된 메서드는 인터페이스가 아닌 해당 인터페이스를 구현한 클래스의 인스턴스를 반환해야 한다는 것을 의미한다.

## 인터페이스의 장점

### 개발시간 단축

인터페이스는 프로그램의 설계도이므로, 이를 사용하여 프로그램을 작성하는 것이 가능하다. 메서드를 호출하는 쪽은 메서드의 내용과 관계없이 선언부만 알면 되기 때문이다. 또한, 인터페이스라는 미리 작성된 설계도를 통해 호출하는 쪽, 메서드를 구현하는 쪽 양쪽에서 개발이 가능하다.

### 표준화 가능

인터페이스는 기본 틀의 역할이 가능하다. 개발자들에게 인터페이스를 구현하여 프로그램을 작성하게 함으로써 표준화의 기능을 수행할 수 있다.

### 서로 관계없는 클래스들에게 관계를 맺어 줄 수 있다

서로 상속관계에 있지도 않고, 같은 조상클래스를 가지고 있지 않더라도 하나의 인터페이스를 공통적으로 구현하게 함으로써 관계를 맺어줄 수 있다.

### 독립적 프로그래밍이 가능해진다

인터페이스를 이용하여 클래스의 선언과 구현을 분리할 수 있기 때문에 실제 구현에 독립적인 프로그램을 작성하는 것이 가능하다. 클래스와 클래스간의 직접적인 관계보다, 인터페이스를 이용한 간접적인 관계는 클래스의 변경이 다른 클래스에 영향을 끼치지 않는 독립적인 프로그램 작성이 가능해진다.

## 인터페이스의 이해

인터페이스 자체를 이해해보자.

> 클래스를 사용하는 쪽은 사용하려는 메서드의 선언부만 알면 된다. (내용은 몰라도 된다.)

이 구문은 캡슐화의 핵심과도 같은 구문인데, 이 부분을 제일 잘 구현해주는 기능이 인터페이스이다. 인터페이스는 이 기능을 위해 제작되었으며, 지금도 활발하게 사용되고 있다.

