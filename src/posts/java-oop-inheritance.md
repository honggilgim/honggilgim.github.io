## 상속(inheritance)

### 상속의 정의와 장점

> 기존의 클래스를 재사용하여 새로운 클래스를 작성하는 것.

이것이 상속이다. 상속을 통해 클래스를 작성하면 보다 적은 양의 코드로 신규 코드를 작성할 수 있고 코드를 공통적으로 관리할 수 있다. 이는 코드의 재사용성을 높이고 프로그램의 생산성과 유지보수에 크게 기여한다.

상속을 구현하는 방법은, `extends`를 사용하면 된다. extends 뒤에 원하는 클래스를 적으면 그 클래스를 상속받아 코드를 작성할 수 있게 된다.

```java
public interface WishRepository extends JpaRepository<WishTicket, Object> {
}
```

실제 자바 JPA Repository를 통해 상속받은 인터페이스를 보여주는 코드다. 이런 식으로 작성하면 된다.

이 때, 상속해주는 JpaRepository는 부모 클래스, 상속을 받은 WishRepository는 자식 클래스가 된다. 부모 클래스가 변경된다면 자손 클래스는 영향을 받지만, 자손 클래스가 변경되는 것은 조상 클래스에 아무런 영향도 주지 못한다. 자손 클래스는 조상 클래스의 모든 멤버변수를 상속받고, 이 때문에 확장이라는 뜻인 extends를 사용해 상속을 작성한다.

이 상속의 계층은 제한이 없다. 저기에 사용된 JpaRepository는,

```java
public interface JpaRepository<T, ID> extends ListCrudRepository<T, ID>, ListPagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
}
```

이러한 선언부를 가지고 있고

```java
public interface ListCrudRepository<T, ID> extends CrudRepository<T, ID> {
}
```

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
}
```

```java
public interface Repository<T, ID> {
}
```

이렇게 총 ListCrudRepository, CrudRepository, Repository를 통해 상속이 이루어진다.

## 클래스들간의 관계 - 포함 관계

상속을 통한 관계를 제외하고도, 클래스들 간에는 포함 관계 역시 존재한다. 이 포함 관계는

```java
class Graph {
    int x;
    int y;
    int z;
}

class Math {
    Graph g;
}
```

이런 형태로 작성된다. 한 클래스를 작성하는 데에 다른 클래스를 매개변수로 선언한 후 포함시키는 것은 매우 좋은 생각이다. 하나의 거대한 클래스보다, 이렇게 단위별로 여러 개의 클래스를 작성하고 포함관계로 작성하는 일은 매우 좋은 코드 작성법이다.

## 클래스간의 관계 결정하기

클래스를 작성하는 데 있어서 상속관계를 맺을 것인지 아니면 포함관계를 맺을 것인지는 결과적으로는 별 차이가 없다. 그래도 나뉘는데, 이를 구별하기 위해서는 보통

**is(이다)** **has(가진다)** 라는 문장을 만들어 주면 된다.

예를 들어,

1. **스포츠카는 차이다** -> 상속 관계
   - 스포츠카라는 클래스는 차라는 부모 클래스의 하위 클래스로 넣어준다.
   - "스포츠카는 차를 가진다"라는 문구는 논리적으로 옳지 않다.

2. **사람은 티켓을 가진다** -> 포함 관계
   - "사람은 티켓이다"라는 문구는 맞지 않는다.

## 단일 상속

자바는, 단일 상속만을 허용한다. 다중 상속을 허용할 경우, 클래스들 간의 상속관계가 복잡해져 어려워진다.

## Object 클래스

자바에는 Object 클래스라는 것이 있다. 이것은 모든 클래스 상속 계층도의 최상위에 있는 조상 클래스이다. 다른 클래스로부터 상속 받지 않는 모든 클래스들은 자동적으로 Object 클래스의 상속을 받는다.

그래서,

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    return (anObject instanceof String aString)
            && (!COMPACT_STRINGS || this.coder == aString.coder)
            && StringLatin1.equals(value, aString.value);
}
```

실제 자바 String 클래스의 equals 메서드이다. 이렇게 Object 클래스를 사용해 어떤 객체든지 받을 수 있게 해 준다.

