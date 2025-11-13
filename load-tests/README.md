# K6 부하 테스트

이 디렉토리에는 K6를 사용한 부하 테스트 스크립트가 포함되어 있습니다.

## 설치

### Windows
```bash
# Chocolatey
choco install k6

# Winget
winget install k6 --source winget
```

### Linux/Mac
```bash
# Homebrew (Mac/Linux)
brew install k6

# Debian/Ubuntu
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

설치 확인:
```bash
k6 version
```

**중요: Windows에서는 PowerShell 또는 CMD에서 실행하세요!**
- Git Bash에서는 k6가 인식되지 않을 수 있습니다
- PowerShell 또는 CMD 터미널을 사용하세요

## 테스트 스크립트

### 1. basic-load-test.js
일반적인 부하 테스트 - 단계적으로 사용자를 증가시키며 시스템 성능 측정

**시나리오:**
- 10명 사용자로 시작 (30초)
- 10명 유지 (1분)
- 50명으로 증가 (30초)
- 50명 유지 (1분)
- 종료 (30초)

**총 소요시간:** 약 3.5분

### 2. spike-test.js
스파이크 테스트 - 갑작스러운 트래픽 증가 시뮬레이션

**시나리오:**
- 갑자기 10명에서 100명으로 급증
- 시스템의 탄력성과 복구 능력 테스트

**총 소요시간:** 약 1분

### 3. stress-test.js
스트레스 테스트 - 시스템의 한계점 찾기

**시나리오:**
- 50명 → 100명 → 200명 → 300명으로 점진적 증가
- 시스템이 언제 무너지는지 확인

**총 소요시간:** 약 7분

## 실행 방법

**주의: PowerShell 또는 CMD에서 실행하세요!**

### 로컬 서버 테스트
```powershell
# 기본 부하 테스트
k6 run load-tests/basic-load-test.js

# 스파이크 테스트
k6 run load-tests/spike-test.js

# 스트레스 테스트
k6 run load-tests/stress-test.js
```

### 원격 서버 테스트
```powershell
# BASE_URL 환경변수로 서버 주소 지정
k6 run -e BASE_URL=https://your-server.com load-tests/basic-load-test.js

# 예시: 실제 운영 서버
k6 run -e BASE_URL=https://tibutibu.com load-tests/basic-load-test.js
```

### VSCode에서 실행
1. VSCode에서 `Ctrl + Shift + P`
2. "Terminal: Select Default Profile" 선택
3. "PowerShell" 또는 "Command Prompt" 선택
4. 새 터미널 열기 (`Ctrl + Shift + ``)
5. 위의 명령어 실행

### 결과를 파일로 저장
```bash
# JSON 형식으로 저장
k6 run --out json=results.json load-tests/basic-load-test.js

# InfluxDB로 전송 (Grafana 연동)
k6 run --out influxdb=http://localhost:8086/k6 load-tests/basic-load-test.js
```

## 모니터링

부하 테스트 중에는 다음 대시보드를 확인하세요:

1. **Prometheus**: http://localhost:9090 (또는 서버주소:9090)
2. **Grafana**: http://localhost:3001 (또는 서버주소:3001)
3. **Spring Actuator**: http://localhost:8080/actuator/prometheus

### Grafana 대시보드 Import

Grafana에 접속 후 다음 대시보드를 import하세요:

1. **JVM (Micrometer)**
   - Dashboard ID: `4701` 또는 `11955`
   - JVM 메모리, GC, 스레드 모니터링

2. **PostgreSQL Database**
   - Dashboard ID: `9628` 또는 `455`
   - DB 커넥션, 쿼리 성능 모니터링

3. **Spring Boot Statistics**
   - Dashboard ID: `12900` 또는 `6756`
   - HTTP 요청, 응답 시간 모니터링

## 결과 해석

### 주요 메트릭

- **http_req_duration**: HTTP 요청 응답 시간
  - p(95): 95%의 요청이 이 시간 내에 완료
  - 일반적으로 500ms 이하가 좋음

- **http_req_failed**: 실패한 요청 비율
  - 10% 이하 유지 권장

- **vus (Virtual Users)**: 동시 사용자 수

- **iterations**: 테스트 함수 실행 횟수

### 성능 기준

- **Good**: p95 < 200ms, 에러율 < 1%
- **Acceptable**: p95 < 500ms, 에러율 < 5%
- **Poor**: p95 > 1000ms, 에러율 > 10%

## 주의사항

1. **운영 서버 테스트 시 주의**
   - 실제 사용자에게 영향을 줄 수 있음
   - 트래픽이 적은 시간대에 테스트
   - 점진적으로 부하를 증가시킬 것

2. **네트워크 대역폭**
   - 로컬 네트워크 속도에 영향 받음
   - 클라우드 VM에서 실행하는 것을 권장

3. **리소스 모니터링**
   - CPU, 메모리, 네트워크 사용량 확인
   - DB 커넥션 풀 설정 확인

## 커스터마이징

실제 API 엔드포인트를 테스트하려면 스크립트를 수정하세요:

```javascript
// basic-load-test.js의 default function 내부
let apiRes = http.get(`${BASE_URL}/api/your-endpoint`);
let apiCheck = check(apiRes, {
  'API status is 200': (r) => r.status === 200,
  'API response is valid': (r) => r.json('data') !== undefined,
});
```

## 문제 해결

### K6 명령을 찾을 수 없음
- PATH에 k6가 추가되었는지 확인
- 터미널을 재시작하세요

### 서버 연결 실패
- BASE_URL이 올바른지 확인
- 서버가 실행 중인지 확인
- 방화벽 설정 확인

### 결과가 이상함
- 네트워크 상태 확인
- 서버 리소스(CPU/메모리) 확인
- DB 커넥션 풀 설정 확인
