## 서론

본 문서는 **Ollama를 API 서버로 활용**하는 방안에 대한 실험 및 분석 결과를 정리해 보았다.

Ollama를 사용하여 로컬 LLM을 구동하고, 해당 모델의 결과값을 기반으로 신규 서비스에 적용하는 것이 가능한지 테스트했다.

## 모델 선정

모델을 선정할 때는 크게 두 가지 케이스로 나누어 고려했다.

- **한국어 질의 → 결과 응답**
- **영어 질의 → 결과 응답**

테스트 환경은 아래와 같다.

- **실험 환경**: MacBook Pro 2022 (M2 Pro, 16GB RAM)
- **저장 공간**: 약 90GB (대형 모델 실험 가능)

### 테스트 모델

#### Llama 3.2 (3B)

**개요**

- Meta에서 공개한 Llama 3.2 계열의 소형 텍스트 전용 모델
- 3B(30억 매개변수) 규모, 개인 PC/엣지 환경에서도 구동 가능
- 텍스트 전용 모델(멀티모달 기능 없음)
- 주 사용처: 대화, 코드 작성, 간단 분석, 문서 처리

**평가**

- 모델 정확도: **하(한국어) / 상(영어)**
- 모델 용량: 약 **2.0GB**
- 응답 속도: **상** (10~20초 이내)

**활용 후기**

- 경량 모델이라 로컬 PC 테스트용으로 적합
- 한국어 정확도는 낮으나, 영어에서는 높은 성능 모델과 유사한 결과 제공
- 응답 속도가 빠르고 효율적

#### DeepSeek-R1:8B

**개요**

- 중국 기반 AI 기업 DeepSeek의 추론(reasoning) 특화 모델 계열
- 8B급 경량화/증류(distilled) 모델
- 수학, 논리, 코드 등 복합적 사고 작업에 강점

**평가**

- 모델 정확도: **상(한국어) / 하(영어)**
- 모델 용량: 약 **5.2GB**
- 응답 속도: **중** (3~4분)

**활용 후기**

- 한국어 응답 성능은 테스트 모델 중 가장 우수
- 영어 성능은 Llama 3.2 대비 부족
- 응답 시간이 다소 길어 실시간성에는 제약

#### Llama 4

**개요**

- Meta AI에서 2025년 4월 발표한 최신 모델
- 네이티브 멀티모달 지원(텍스트 + 이미지)
- Mixture-of-Experts(MoE) 구조로 효율성 강화
- 멀티언어 지원 및 긴 문맥 처리 능력 확장

**평가**

- 로컬 환경(MacBook Pro M2)에서는 구동 불가

**활용 후기**

- 최신 기능을 활용해보고 싶었으나, 로컬 환경 제약으로 실행 불가능

## 실습

### 실습 환경

- **프레임워크**: Spring Boot 3.5
- **언어**: Java 21
- **DB**: MariaDB
- **프론트엔드**: React
- **테스트 내용**: 에러 로그 메일링 AI 에어전트 기능 구현

**사용 모델**

- 로컬: Llama 3.2 (Ollama 구동)
- 외부: Gemini-2.0-Flash (Google API, 무료 제공)

### 실습 내용

#### 소스 코드 (예시)

```java
@Component
public class AiClient {
    private final RestTemplate restTemplate = new RestTemplate();

    // 로컬 LLM (한국어 버전)
    public String analyzeErrorByLocal(String errorMessage) {
        String url = "http://localhost:11434/api/generate";
        Map<String, Object> request = new HashMap<>();

        String prompt = """
            너는 소프트웨어 시스템 로그 분석 전문가야.
            아래 에러 메시지를 분석하고, 위험도를 판단하며, 원인과 영향을 설명하고, 추천 조치를 제시해줘.
            반드시 한국어로 대답해줘.
            환경 : 스프링 부트 3.5.0 , 자바 21, 마리아 DB, React
           
            에러 메시지:
            %s
           
            {
              "risk_level": "Low|Medium|High",
              "cause": "에러 원인 설명",
              "impact": "시스템/사용자/데이터에 미치는 영향",
              "action_steps": "추천 조치 및 해결 방법"
            } 이 형식에 맞게 대답 조정해서 리턴해줘.
        """.formatted(errorMessage);

        request.put("model", "llama3.2:3b");
        request.put("prompt", prompt);
        request.put("stream", false);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, new HttpEntity<>(request), String.class);
            JsonNode root = new ObjectMapper().readTree(response.getBody());
            return root.get("response").asText();
        } catch (Exception e) {
            return "⚠️ Ollama 분석 실패: " + e.getMessage();
        }
    }

    // 로컬 LLM (영문 버전)
    public String analyzeErrorByLocalverEnglish(String errorMessage) {
        // ... (위와 동일한 구조, 프롬프트만 영어로 작성)
    }

    // 외부 LLM (Gemini API)
    public String analyzeErrorByGemini(String errorMessage) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

        // 프롬프트 구성
        String promptText = """
        너는 소프트웨어 시스템 로그 분석 전문가야.
        아래 에러 메시지를 분석하고, 위험도를 판단하며, 원인과 영향을 설명하고, 추천 조치를 제시해줘.

        에러 메시지:
        %s

        응답은 반드시 순수 JSON 형식으로 출력해줘: json 외부에 추가 텍스트나 설명은 절대 붙이지 마.
        {
          "risk_level": "Low|Medium|High",
          "cause": "에러 원인 설명",
          "impact": "시스템/사용자/데이터에 미치는 영향",
          "action_steps": ["추천 조치1", "추천 조치2"],
          "additional_info_needed": "추가 정보가 필요하면 설명, 없으면 null"
        }
        """.formatted(errorMessage);

        // 요청 Body 구성
        Map<String, Object> part = new HashMap<>();
        part.put("text", promptText);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", "");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            // Gemini 응답 구조: { "results": [ { "content": { "parts": [ { "text": "..." } ] } } ] }
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode candidates = root.get("candidates");
            if (candidates != null && candidates.isArray() && candidates.size() > 0) {
                JsonNode textNode = candidates.get(0).get("content").get("parts").get(0).get("text");
                if (textNode != null) {
                    String text = textNode.asText();

                    // ```json ... ``` 제거
                    text = text.replaceAll("(?s)^```json\\s*", "").replaceAll("```$", "").trim();
                    return text;
                }
            }
            return "⚠️ Gemini API 응답이 비어 있습니다.";
        } catch (Exception e) {
            return "⚠️ Gemini 분석 실패: " + e.getMessage();
        }
    }
}
```

#### 소스 설명

- **JSON 응답 강제**: 에러 로그를 메일에 담아 전달하기 위해 **JSON 포맷 출력**을 프롬프트에 명시
- **stream 옵션**:
  - `stream=true` → 실시간 토큰 단위 응답 (챗봇 적합)
  - `stream=false` → 전체 응답을 한 번에 수신 (메일 서비스 적합)

### 결과 및 비교

- **Llama 3.2**
  - 영어 성능: Gemini-2.0-Flash와 유사한 수준
  - 한국어 성능: JSON 응답 정확도가 낮음

- **DeepSeek-R1:8B**
  - 한국어 성능: 가장 뛰어남
  - 영어 성능: Llama 3.2 대비 부족
  - 응답 속도: 느림 (3~4분)

- **Gemini-2.0-Flash**
  - JSON 응답 구조 정확
  - 안정적 API 제공
  - 다만, 외부 API 의존성 존재

## 결론

- **로컬 환경 실용성**: Llama 3.2는 경량 모델임에도 불구하고 영어 기준으로 Gemini와 비교해도 큰 차이가 없는 성능을 보여주었다.
- **한국어 대응**: DeepSeek-R1:8B가 테스트 결과에서 가장 우수하나, 응답 속도와 자원 소모가 크다는 단점이 있다.
- **최종 판단**: **로컬 LLM(Llama 3.2)** 으로 하면 외부 api에 비교되는 서비스 제작이 가능하다.

