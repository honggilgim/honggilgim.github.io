# 자동 번역 기능 구현하기

프로젝트 진행 중 창업 박람회에서 보여줄 만한 기능으로 영문 사이트 기능을 만들었고, 이에 맞추어 자동 번역 기능을 만들었다.

# 1. 요구사항

현재 진행하고 있는 프로젝트는 "핀유트"로 자신이 갔다온 음식점에 리뷰를 작성해 친구들과 공유하는 소셜 앱이다.

현재 프로젝트의 데이터 중에서 자동 번역을 제공해야 하는 데이터는 review 테이블 안의 review의 내용과 본문 comment 테이블의 comment 내용 뿐이라 판단했다. 기타 다른 부분은 번역을 진행 안한다.

# 2. api 선택

많은 번역 api가 사용 가능하고, 프로젝트 환경에 맞는 번역 api를 선택하여야 했다.

1. 파파고 api
네이버에서 제공하는 api이다. 한국어 관련 번역에서 최고의 성능을 제공하고 있다고 알려져 있고, 네이버라는 기업이 한국 기업이니만큼 한국에 특화된 서비스를 제공한다고 알고 있다. 
	- 가격 : 텍스트 100만 자당 20,000원 일일 만 자 무료
    
2. 구글 번역 api
구글에서 제공하는 api다. 다국적 기업인 구글이니만큼 여러 언어에 대한 범용성을 제공한다.
	- 가격 : 월 50만 자까지 무료, 초과 시 100만 자당 $20
    
이 두 가지 말고도 딥엘, 아마존 트랜슬레이트 등 다른 번역 api가 존재하고 클라우드 환경에 구성하여 우리가 직접 사용 가능한 모델형 번역기도 있지만, 현재 프로젝트 환경에서는 두 가지 이외에 다른 api는 맞지 않다고 판단해 저 두 가지 중 하나를 고르기로 결정했다.

## 2-1. api 선택과정

- 가격적인 측면
	가격적인 측면에서는 구글 번역 api 가 네이버 번역 api 보다 뛰어나다. 구글은 달마다 50만자까지 무료이고 초과 시 100만 자당 20달러를 지불하는데, 한 달에 50만 자 무료라는 점이 크게 다가왔다. 현재 프로젝트는 출시는 되었지만 사용자는 거의 없다고 봐도 무방한 출시 단계이고, 만약 50만 자를 넘어 사용할 정도가 되면 저 정도 가격은 구애받지 않아도 된다고 생각했다. 네이버 역시 저렴하지만, 구글이 제공하는 한 달 50만 자 무료 라는 점이 좋다고 느꼈다. 
    (50만 자라는 글자는 책 2~3권에 해당하는 거대한 글자다.)
    
    
- 성능적인 측면
당연히 네이버가 더 뛰어날 것이라 생각했는데, 네이버 api는 테스트 결과 생각보다 구글 번역 api보다 성능이 떨어지는 점을 보였다.
ex : ㅗㅜㅑ 라는 단어 번역 시
네이버의 사례
![](/images/posts/project-auto-translation/01.png)
구글의 사례
![](/images/posts/project-auto-translation/02.png)

위 결과를 보고 구글 번역 api를 사용하기로 최종 결정했다.


# 3. 구현 (클라우드 서비스 계정)
우선, Api 사용 신청은 해야 한다. 이 부분은 별로 어렵지 않으므로 따로 기록하지 않았다.

구글 번역 api는 수많은 종류가 존재한다. 이 중 선택해서 api를 써야 하는데, 나의 경우는 무조건 값싼 api를 활용하고자 했다. 번역하고자 하는 텍스트의 품질이 아주 높은 것이 아닌, 간단한 문장 수준이었기에 보기에 가장 값싸고 품질이 좋아보이는 v2/v3 General NMT를 활용하기로 했다.

구글 번역 api를 사용하기 위해서는 구글 클라우드 서비스에서 제공하는 Cloud Translation API 를 사용하는 일이 가장 효율적이다. 구글 api의 경우는 사용하기 위해 key, OAuth 등 다양한 인증 방식이 존재하는데, key가 가장 간편하다.

하지만 내가 사용하고자 하는 api인 v2/v3 General NMT 의 경우는 키 방식을 지원하지 않았다. 이 api를 활용하기 위해서는 구글 IAM 관리자에서 서비스 계정을 만들어 json OAhth2 인증 포맷 형식을 만들어야 한다.

-1. 구글 클라우드 콘솔 접속
(https://console.cloud.google.com)

![](/images/posts/project-auto-translation/03.png)

접속하면 이런 화면이 보인다. 프로젝트 선택 및 로그인은 해주어야 한다. 여기서 IAM 및 관리자 선택 버튼을 눌러준다.

-2. IAM 및 관리자 선택 화면
![](/images/posts/project-auto-translation/04.png)
들어간 후, 서비스 계정을 선택하면 이런 화면이 보인다. 저건 만들어진 계정인데, 여기서 새로 계정을 만들어 OAuth2 인증을 해주어야 한다.

-3. 서비스 계정 만들기
![](/images/posts/project-auto-translation/05.png)

서비스 계정은 자신의 프로젝트 환경에 맞게 만들어준다.

-4. json 다운
![](/images/posts/project-auto-translation/06.png)

만들어진 서비스 계정 환경에 접속하여 키 탭에 들어가면 키 추가가 가능하고, 키 생성을 json 방식으로 만들 경우 json 으로 구성된 OAuth2 인증 Json이 다운받아진다. 이 json 은
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}

```

위와 같은 형태를 뛴다.

# 4. 자바 구현

## 4.1 api 호출부 구현

json으로 된 OAuth2 파일으로 번역 api호출을 하는 서비스 먼저 만들었다.

```java
 @PostConstruct
    public void init() {
        try (InputStream is = getClass().getResourceAsStream("/google-service-account.json")) {
            credentials = GoogleCredentials.fromStream(is)
                    .createScoped("https://www.googleapis.com/auth/cloud-translation");
        } catch (IOException e) {
            log.error("[TranslationService] 서비스 계정 로드 실패: {}", e.getMessage());
        }
    }
```
클래스패스에서 json 계정을 읽어 credentials 객체를 초기화한다. 이 시점에는 토큰은 존재하지 않고 인증 정보(private key 등)만 로드된 상태이다. 이 작업은 PostConstruct를 통해 Spring bean 생성 후 딱 1번만 실행된다. 

```java
 @SuppressWarnings("unchecked")
    public String translateToEnglish(String text) {
        if (text == null || text.isBlank()) {
            return text;
        }
        try {
            credentials.refreshIfExpired();
            String accessToken = credentials.getAccessToken().getTokenValue();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(text),
                    "targetLanguageCode", "en",
                    "mimeType", "text/plain"
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            Map<String, Object> response = restTemplate.postForObject(TRANSLATE_V3_URL, request, Map.class);

            if (response != null) {
                List<Map<String, Object>> translations = (List<Map<String, Object>>) response.get("translations");
                if (translations != null && !translations.isEmpty()) {
                    return (String) translations.get(0).get("translatedText");
                }
            }
        } catch (Exception e) {
            log.error("[TranslationService] 번역 실패 - error: {}", e.getMessage());
        }
        return text;
    }
```

실제 한국어 -> 영어로 번역하는 서비스이다. 현재는 영어로 해놨는데, 다른 언어도 비슷한 포멧으로 손쉽게 만들 수 있다.

구문별로,

###   1. 인증
  ```java
  credentials.refreshIfExpired();
  String accessToken = credentials.getAccessToken().getTokenValue();
  // 실제 Bearer 토큰 문자열 추출
  ```
  구글의 OAuth2 계정의 액서스 토큰은 1시간마다 자동으로 만료된다. 만료되었으면 서비스 계정의 private key 로 새 토큰을 자동으로 발급한다. 아직 유효할 경우는 기존 토큰을 재사용한다. GoogleCredentials 이라는 구글에서 제공해주는 라이브러리의 메소드이다.

  그 뒤 토큰의 문자열을 추출한다.

  ### -2. http 요청 구성
  ```java
  HttpHeaders headers = new HttpHeaders();
  headers.setBearerAuth(accessToken);          // Authorization: Bearer {token}
  headers.setContentType(MediaType.APPLICATION_JSON);

  Map<String, Object> requestBody = Map.of(
      "contents", List.of(text),               // 번역할 텍스트 (배열 형태)
      "targetLanguageCode", "en",              // 번역 목표 언어: 영어
      "mimeType", "text/plain"                 // 텍스트 형식 (HTML이면 "text/html")
  );
  ```

  http 요청에 위에서 뽑은 토큰과 텍스트, 번역 목표 영어, 텍스트 형식을 넣어 body 데이터를 구성한다.

  ### -3. 응답 및 텍스트 추출
  ```java
  HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
  Map<String, Object> response = restTemplate.postForObject(TRANSLATE_V3_URL, request, Map.class);

  // 응답 JSON 구조:
  // {
  //   "translations": [
  //     { "translatedText": "Hello", "detectedSourceLanguage": "ko" }
  //   ]
  // }

  List<Map<String, Object>> translations = (List<Map<String, Object>>) response.get("translations");
  return (String) translations.get(0).get("translatedText");  // "Hello" 추출
  ```

  translatedText를 추출하여 리턴한다.

  ### -4. 실패 시
  ```java
  } catch (Exception e) {
      log.error("[TranslationService] 번역 실패 - error: {}", e.getMessage());
  }
  return text;  
  ```

  실패 시에는 원문을 구성하도록 제작했다. 위 서비스를 이용하면 우리는 한글 데이터를 넣으면 영문 번역 데이터를 리턴해주는 서비스를 손쉽게 구성할 수 있다.

### - 전체 코드

```java
package com.pinup.global.translation;

import com.google.auth.oauth2.GoogleCredentials;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class TranslationService {

    private static final String TRANSLATE_V3_URL =
            "https://translation.googleapis.com/v3/projects/pinup-dc3c1/locations/global:translateText";

    private GoogleCredentials credentials;
    private final RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void init() {
        try (InputStream is = getClass().getResourceAsStream("/google-service-account.json")) {
            credentials = GoogleCredentials.fromStream(is)
                    .createScoped("https://www.googleapis.com/auth/cloud-translation");
        } catch (IOException e) {
            log.error("[TranslationService] 서비스 계정 로드 실패: {}", e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    public String translateToEnglish(String text) {
        if (text == null || text.isBlank()) {
            return text;
        }
        try {
            credentials.refreshIfExpired();
            String accessToken = credentials.getAccessToken().getTokenValue();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(text),
                    "targetLanguageCode", "en",
                    "mimeType", "text/plain"
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            Map<String, Object> response = restTemplate.postForObject(TRANSLATE_V3_URL, request, Map.class);

            if (response != null) {
                List<Map<String, Object>> translations = (List<Map<String, Object>>) response.get("translations");
                if (translations != null && !translations.isEmpty()) {
                    return (String) translations.get(0).get("translatedText");
                }
            }
        } catch (Exception e) {
            log.error("[TranslationService] 번역 실패 - error: {}", e.getMessage());
        }
        return text;
    }
}

```

## 4-2. 마이그레이션 서비스 구현

각 테이블들의 기존 데이터들에서 마이그레이션용 서비스를 구현한다. 기존 테이블의 구성에서 영문 테이블의 칼럼을 추가하여 진행했다.

각각의 타겟 테이블들을 지정하고, 그 테이블들에 맞게 데이터를 추출해서 마이그레이션을 진행하는 서비스를 만들었다.

ApplicationRunner 를 사용하여 서버가 시작될 때마다 실행되도록 설정했다.

### 구현 방식

1. 서버가 구동될 때마다 서비스를 실행한다.
2. 번역 안된 장소를 조회 후 장소별로 순차 번역을 실시한다. try - catch 문으로 한 번 실패해도 다음 건으로 넘어가도록 설정한다.
3. 결과를 로깅한다.

### 예시 전체 코드

```java
package com.pinup.global.migration;

import com.pinup.domain.place.entity.Place;
import com.pinup.domain.place.repository.PlaceRepository;
import com.pinup.global.translation.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Order(2)
@Component
@RequiredArgsConstructor
public class PlaceTranslationMigration implements ApplicationRunner {

    private final PlaceRepository placeRepository;
    private final TranslationService translationService;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        List<Place> places = placeRepository.findPlacesWithoutEnglishFields();

        int translated = 0;
        int failed = 0;

        for (Place place : places) {
            try {
                String nameEn = translationService.translateToEnglish(place.getName());
                String addressEn = translationService.translateToEnglish(place.getAddress());
                String roadAddressEn = translationService.translateToEnglish(place.getRoadAddress());
                place.updateEnglishFields(nameEn, addressEn, roadAddressEn);
                translated++;
            } catch (Exception e) {
                log.error("장소 번역 실패 - placeId: {}, error: {}", place.getId(), e.getMessage());
                failed++;
            }
        }

        log.info("완료 - 번역: {}건, 실패: {}건", translated, failed);
    }
}

```

코드는 간단하게 기존 테이블의 데이터를 불러와 번역 안되어있는 경우 업데이트를 진행하도록 구성했다. 여기서

```
@Order(2) 
```
어노테이션은 ApplicationRunner의 실행 순서를 지정해주는 서비스인데, 여러 테이블들을 돌려야 하기에 실행 순서를 지정하여 구성했다. 숫자가 낮을수록 먼저 실행하고 아무것도 설정되어 있지 않을 경우 1로 지정된다. 

# 4. 후기

딱히 없다.