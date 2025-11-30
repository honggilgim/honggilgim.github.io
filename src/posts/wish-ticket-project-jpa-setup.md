## 개요

### JPA 사용법

나는 이번 프로젝트를 JPA를 사용하여 구성했다. 기존에 MyBatis만을 사용해서 프로젝트를 진행했기에, 새로운 기술을 사용해보고 싶었다. GraphQL은 나중에 리팩토링 하기로 하고, 우선 RESTful API에 JPA를 사용하여 만들고자 한다.

## JPA 기본 구조

JPA는 MyBatis와는 다르게 Mapper를 가지지 않는다. 기본적인 CRUD 쿼리는 전부 JPA에 제공되어 있는 쿼리를 사용하고 부족한 부분은 실제 쿼리를 짜서 사용할 수 있다. 현재 구현된 부분만을 정리하고자 한다.

JPA의 Repository는 손쉽게 설정할 수 있다.

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<EntityDto, Object> {
    List<EntityDto> findByColumnOrderByTestDate(String Test);
    
    long countByTest(String Test);
}
```

실제 오늘 작성한 프로젝트에서 사용한 코드이다. 손쉽게 작성할 수 있고 코드 줄 수가 매우 줄며 파일 관리가 용이해진다.

## Entity 클래스

**정의**: JPA(Entity) 클래스는 데이터베이스 테이블과 매핑되는 자바 클래스로, 객체와 관계형 데이터베이스 간의 매핑을 담당합니다. JPA(Entity) 클래스는 일반적으로 @Entity 어노테이션을 사용하여 지정됩니다. 이 클래스는 테이블과 1:1로 매핑되고, 각 필드는 테이블의 컬럼과 매핑됩니다. (출저: ChatGPT)

이 Entity 클래스에서 사용하는 어노테이션들은

1. **@Id**: PK 칼럼 지정. 없으면 오류난다.
2. **@GeneratedValue(strategy = GenerationType.IDENTITY)**: PK를 만들 때 보통 key 값을 간단한 int 혹은 long 형으로 저장하는데, 이 부분을 지정해주는 어노테이션이다. 테이블 DDL에서 AUTO_INCREMENT 속성을 PK 선언할 때 지정해주지 않는다면 오류난다.
3. **@Column**: 칼럼의 이름을 지정해주는 어노테이션이다. 칼럼 이름 혹은 제약조건을 지정해 줄 수 있다.
4. **@Entity**: 이 클래스가 JPA에서 관리하는 Entity 클래스라는 것을 알려준다.
5. **@Table**: name 속성을 통해 이 Entity가 바라보는 테이블을 말해준다.

### 예시

```sql
CREATE TABLE TEST(
    TEST_ID int(6) PRIMARY KEY AUTO_INCREMENT, -- PK
    TEST_STATUS varchar(10), 
    DATE DATE DEFAULT now(),   
    COMMENT varchar(20)
)
default charset = utf8mb4 -- 기본 charset 지정 안해주면 한글 안들어간다.
;
```

이 테이블의 Entity 클래스를 만든다면,

```java
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TEST")
public class Test {
    @Id  // 기본 키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TEST_ID")  // DB 테이블의 TEST_ID
    private Long testId;

    @Column(name = "TEST_STATUS", length = 10)
    private String testStatus;

    // 수정일자
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE")
    private String date;

    // 코멘트
    @Column(name = "comment", length = 20)
    private String comment;
}
```

이런 형식으로 제작할 수 있다.

## JPA 기본 제공 메소드

JpaRepository는 우리가 정의하지 않아도 쓸 수 있는 여러 메소드를 제공해준다.

지금 사용해본 것들만 써보면,

```java
@Service
public class TestService {
    private final TestRepository testRepository;

    // 생성자 주입
    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }
    
    public List<EntityDto> selectTest(String test) {
        return testRepository.findByColumnOrderByTestDate(String Test);
    }

    public long countByTestStatus(String test) {
        return testRepository.countByTest(String Test);
    }

    public void insertTest(String comment) {
        EntityDto newdto = new EntityDto();
        newdto.setTestStatus("test");
        newdto.setDate(LocalDateTime.now().toString()); // 현재날짜로 지정
        newdto.setComment(comment);

        // save() 메소드를 통해 새로운 엔티티를 저장
        wishRepository.save(EntityDto);
    }

    public List<EntityDto> findAll() {
        return testRepository.findAll();
    }

    public Long countAll() {
        return testRepository.count();
    }
}
```

이런 식으로 지정이 가능하다. 아주 손쉽게 countAll 및 다양한 서비스들을 사용할 수 있다. MyBatis였으면 몇 배는 길어질 코드가 이렇게 손쉽게 리팩토링되었다.

이렇게 하고 컨트롤러단에서 Service를 호출해주면 그대로 함수가 호출되어 손쉽게 DB와의 통신을 진행할 수 있다.

