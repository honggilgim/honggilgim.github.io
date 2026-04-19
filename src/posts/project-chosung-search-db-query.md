# 초성검색 구현하기

프로젝트 진행 중 초성 검색을 구현해달라는 요구사항이 들어왔다. 초성 검색을 구현한 방법에 대해 서술하려고 한다.

## 1. 프로젝트 환경

현재 진행하고 있는 프로젝트는 "핀유트"로 자신이 갔다온 음식점에 리뷰를 작성해 친구들과 공유하는 소셜 앱이다.

이 소셜 앱의 포스팅은 `place` 테이블과 `review` 테이블이라는 두 개의 테이블을 구별하여 구현한다. `place` 테이블은 음식점들의 "장소" 에 대한 정보를 담고 `review` 테이블은 유저가 작성한 리뷰에 관련된 정보를 데이터베이스에 저장한다. `place` 테이블은 사용자가 리뷰를 작성하고자 할 때 이 장소에 대한 정보를 카카오 맵 API를 호출하여 데이터베이스에 저장한다.

## 2. 구현 방안

초성 검색을 구현하기 위해서는 많은 방법이 있다. 정규식을 이용해서 구현하는 방법, 자바스크립트에 나와있는 수많은 라이브러리를 사용하는 방법, 한글 초성 자음 모음집을 만든 후 그 범위 안에 있는 쿼리를 구현하여 만드는 방법, 오픈소스를 이용하는 방법 등 수많은 방법이 존재한다.

나는 구현 과정에서 DB + SQL 쿼리를 이용하여 저장하는 방법을 생각했는데, 이와 관련된 이유는 다음과 같다.

**자바스크립트로 구현하는 방법**은 많은 리스트를 자바스크립트 페이지로 보내야 한다는 단점이 존재한다.

- 우리 서비스의 프론트는 Compose Multiplatform 환경으로 구현되어 있다. 다량의 장소에 대한 리스트를 자바스크립트로 보내는 일은 네트워크 부하를 너무 많이 잡아먹는다고 생각했다.

**자바 내부에서 처리하는 방법**

- 프로젝트의 요구사항이 리뷰 전체를 찾아서 검색하는 방안이라면 이 부분을 생각했을 수도 있지만, 우리는 앞서 말한 프로젝트의 조건인 `place` 테이블에 저장되는 식당의 "이름" 만을 생각해서 초성 검색을 구현하면 된다. 이 방식 역시 우리의 케이스에는 맞지 않다고 느꼈다.

**초성 검색을 위해 저장될 때 초성만을 따로 작성하여 테이블을 작성한 뒤 이를 검색으로 찾으면 어떨까?**

내가 생각해 낸 방식이다. 이 방식으로 작성할 경우 ㄱㄴㄷ로 검색 시 "가나다" 와 "아가나다라마" 와 같은 모든 검색 조건을 충족할 수 있고 우리 프로젝트의 특성 상 `place` 테이블은 리뷰 작성 시에만 저장되니 테이블 부하 및 서버 부하도 크지 않을 거라고 생각했다. 기존에 작성되어 있고 초성이 저장되어 있지 않은 `place` 테이블의 데이터들은 자바의 `ApplicationRunner`를 사용해 서버 시작 시 한번 테이블을 검색해 초성 데이터들을 저장하도록 하여 구성하면 기존의 서버 내용을 해치지 않는 선에서 검색 쿼리를 최소한으로 수정해 검색이 가능하다.

## 3. 세부 구현

위 같은 방식으로 구현하기 위해서는 3가지 조건이 필요하다.

1. 데이터 저장 시 `place` 테이블의 제목 데이터의 초성을 뽑는 로직
2. 앞서 말한 `ApplicationRunner`를 사용해 데이터가 없는 `place` 테이블의 데이터를 추가하는 로직
3. 초성 검색 판별 로직

### 1. 데이터 저장 시 place 테이블의 제목 데이터의 초성 뽑기

초성 데이터는 뽑기에는 많은 과정이 필요하다.

한글은 유니코드에서 수학적으로 계산이 가능한 구조로 배치되어 있다.

가(`0xAC00`) ~ 힣(`0xD7A3`) 총 11,172자 로 되어 있고, 글자 코드 = `0xAC00` + (초성 index × 588) + (중성 index × 28) + 종성 index의 구조로 되어 있다.

즉, 초성 19개 × 중성 21개 × 종성 28개 = 11,172자이고, 초성 하나당 588개(21 × 28)의 글자가 묶여 있기 때문에 588로 나누면 초성 index를 역산할 수 있다.

그렇기 때문에 한 글자가 있다면,

```java
char c = '삼';  // 0xC0BC

int index = ('삼' - 0xAC00) / 588
          = (0xC0BC - 0xAC00) / 588
          = 5308 / 588
          = 9  →  CHOSUNG[9] = 'ㅅ'
```

의 방식으로 초성을 역산하여 계산할 수 있다.

위 방식으로 초성을 역산할 경우 한글일 경우에는 초성을 추출하고 영어, 숫자, 공백일 경우에는 그대로 통과하는 로직을 작성할 수 있다.

실제 작성 예시:

```java
private static final char[] CHOSUNG = {
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
        'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    private static final int HANGUL_START = 0xAC00;
    private static final int HANGUL_END = 0xD7A3;
    private static final int CHOSUNG_UNIT = 588;
    
 /**
     * 문자열에서 초성만 추출
     * ex) "삼성전자" → "ㅅㅅㅈㅈ"
     */
    public static String extractChosung(String text) {
        if (text == null) return "";
        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (c >= HANGUL_START && c <= HANGUL_END) {
                int index = (c - HANGUL_START) / CHOSUNG_UNIT;
                sb.append(CHOSUNG[index]);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
```

위 방식의 코드로 계산 시, 한글의 한 글자가 들어왔을 때 초성을 그대로 출력하여 저장할 수 있다. (영어, 숫자, 공백은 그대로 무시된다.)

### 2. ApplicationRunner로 초성 없는 데이터 찾아 데이터 추가하기

초성 추출 로직 자체를 자바에서 만들었고, 복잡한 로직이 들어가는 작업일 수록 DB 서버가 아닌 스프링 서버에서 하는 것이 낫다고 알고 있다. 이전에는 DB 서버가 스프링 서버보다 성능이 낫기에 이런 작업이 있을 경우 DB 서버에서 진행했지만, 요즘은 서버가 성능이 좋아져 오히려 스프링 서버에서 작업하는 일이 낫다고 알고 있다.

그래서 서버 시작 시 한번만 돌아가는 마이그레이션용 클래스 파일을 만들어 사용했다.

스프링의 여러 클래스 중 `ApplicationRunner`는 Spring Boot 기동 완료 후 자동으로 `run` 메서드를 실행한다.

`@Component`를 붙여 스프링 시작 시 자동으로 빈이 등록되도록 하여 구현 과정에서 빈이 잘못 등록되는 일이 없도록 하여 작성했다.

```java
package com.pinup.global.migration;

import com.pinup.domain.place.entity.Place;
import com.pinup.domain.place.entity.PlaceChosung;
import com.pinup.domain.place.repository.PlaceChosungRepository;
import com.pinup.domain.place.repository.PlaceRepository;
import com.pinup.global.util.ChosungUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// 마이그레이션용 삭제 예정
@Slf4j
@Component
@RequiredArgsConstructor
public class PlaceChosungMigration implements ApplicationRunner {

    private final PlaceRepository placeRepository;
    private final PlaceChosungRepository placeChosungRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        List<Place> allPlaces = placeRepository.findAll();

        int inserted = 0;
        int skipped = 0;

        for (Place place : allPlaces) {
            boolean alreadyExists = placeChosungRepository.findByPlaceId(place.getId()).isPresent();
            if (alreadyExists) {
                skipped++;
                continue;
            }

            String nameChosung = ChosungUtils.extractChosung(place.getName());
            PlaceChosung placeChosung = PlaceChosung.builder()
                    .place(place)
                    .nameChosung(nameChosung)
                    .build();
            placeChosungRepository.save(placeChosung);
            inserted++;
        }

        log.info("[PlaceChosungMigration] 완료 - 신규 삽입: {}건, 스킵(이미 존재): {}건", inserted, skipped);
    }
}
```

위 과정을 거쳐 앱 최초 기동 시 누락된 초성 데이터를 일괄 생성해주는 로직을 추가했다. 이 클래스는 한번 사용 후 사라질 예정이기에 기존의 `place` 테이블에 데이터를 추가하는 로직에도 역시 초성 데이터를 넣어주는 로직을 추가했다. (`@Transactional` 어노테이션을 사용하여 잘못될 경우 롤백되도록 했다.)

### 3. 초성 검색 판별 로직

초성만이 들어오지 않았다면, 위 초성 검색 데이터를 검색하지 않도록 했다. 기존 글자들과 함께 들어올 경우 위 로직이 정상적으로 작동하지 않기도 하고.

이 구현은 간단했다. 위에서 만든 초성 배열을 돌아 데이터가 있는지 판별하기만 하면 되니까:

```java
    private static final char[] CHOSUNG = {
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
        'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };
    
public static boolean isChosungOnly(String text) {
        if (text == null || text.isBlank()) return false;
        for (char c : text.toCharArray()) {
            boolean matched = false;
            for (char ch : CHOSUNG) {
                if (ch == c) {
                    matched = true;
                    break;
                }
            }
            if (!matched) return false;
        }
        return true;
    }
```

위 로직을 통과하여 `true`로 리턴될 경우만 초성 검색 쿼리를 타도록 작성했다.

```sql
AND (
			:keyword IS NULL
			OR (:isChosung = false AND (r.content LIKE :keyword OR p.name LIKE :keyword))
			OR (:isChosung = true  AND pc.nameChosung LIKE :keyword)
		)
```

기존 검색 로직의 쿼리에 추가한 모습이다.

## 4. 후기

한글 유니코드의 구조를 찾아보고 초성 검색을 구현해본 재밌는 경험이었다. 생각했던 대로 구조가 잘 나와 뿌듯하다. 잘 만든 것 같다. 현재는 로직 상 오류를 발견하지 못했는데, 발견할 경우 새로 업데이트 할 예정이다.
