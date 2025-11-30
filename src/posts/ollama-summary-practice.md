## Ollama

**Ollama**는 최근에 많이 쓰이는 **로컬 LLM(Local Large Language Model) 런타임** 이다.

## Ollama란?

- **역할**: ChatGPT 같은 대형 언어 모델(LLM)을 **클라우드가 아니라 내 PC/Mac에서 직접 실행**할 수 있게 해주는 소프트웨어
- **플랫폼**: macOS, Linux, Windows 지원
- **주요 기능**
  1. Hugging Face 같은 곳에 공개된 다양한 LLM을 손쉽게 내려받아 실행
  2. GPU(M1/M2/M3, NVIDIA GPU 등)와 CPU 환경에서 최적화된 실행 지원
  3. REST API 제공 → `http://localhost:11434` 로 다른 앱(Open WebUI, LangChain, etc.)에서 연결 가능
  4. 모델 캐싱 & 관리 → 필요한 모델만 다운로드해서 로컬에서 바로 사용

## 기본 사용법

### 1. 설치

- macOS:

```bash
brew install ollama
```

또는 [공식 사이트](https://ollama.com)에서 설치한다.

### 2. 서버 실행

```bash
ollama serve
```

→ 기본적으로 `http://localhost:11434` 에 API 서버가 열린다.

### 3. 모델 다운로드 & 실행

run 명령어 + 모델명을 사용하면 다운이 가능하다.

```bash
ollama run llama3
```

### 4. API 사용

터미널이나 코드에서 REST API로 호출이 가능하다.

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "test!"
}'
```

## 실습 by openWebUi

- **실습환경**: 맥북M2프로 2022년식

### 1. 설치

맥북 homebrew를 이용하여 설치했다.

```bash
brew install ollama
```

맥북 환경 상 위 명령어가 아닌,

```bash
arch -arm64 brew install --cask ollama
```

아래 명령어를 사용하여 설치한다.

### 2. 모델 설치

```bash
ollama run llama3.2
```

llama3.2는 **Meta가 발표한 최신형 LLM**으로 영어로 질문했을 시 가장 높은 성능을 보여주는 모델이다. 한국어의 경우 **deepshark가 통상적으로 가장 좋은 성능을 보여준다고 알려져 있다.**

용량은 대략 2GB 정도 차지한다.

### 3. 실습

터미널에 간단한 질문 시 상용LLM에 버금가는 성능으로 답변을 해준다.

### 4. open-webui

상용 chatbot 처럼, 웹에 띄워서 사용하기 위해 open-webui를 도커로 설치하여 가동해본다.

```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

위 명령어를 사용하여 가동했다.

정상적으로 pull 되어 원하는 대로 다운이 되었고, docker에서 프로세스가 정상적으로 올라온 모습을 확인했다.

### 5. 로컬 챗봇 사이트 실험

위 과정을 똑같이 하면 실제 상용 chatbot처럼 화면이 나온다! 이 화면에서 질문을 테스트해보면 생각보다 대단한 성능을 보여준다.

