import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// 커스텀 메트릭 정의
const errorRate = new Rate('errors');
const successRate = new Rate('success');
const apiDuration = new Trend('api_duration');

// 테스트 설정
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // 30초 동안 10명까지 증가
    { duration: '1m', target: 10 },   // 1분 동안 10명 유지
    { duration: '30s', target: 50 },  // 30초 동안 50명까지 증가
    { duration: '1m', target: 50 },   // 1분 동안 50명 유지
    { duration: '30s', target: 0 },   // 30초 동안 0명으로 감소
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95%의 요청이 500ms 이하
    errors: ['rate<0.1'],              // 에러율 10% 이하
    success: ['rate>0.9'],             // 성공률 90% 이상
  },
};

// 서버 URL 설정 (환경변수 또는 기본값)
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  // 1. Health Check
  let healthRes = http.get(`${BASE_URL}/actuator/health`);
  let healthCheck = check(healthRes, {
    'health check status is 200': (r) => r.status === 200,
    'health check has UP status': (r) => r.json('status') === 'UP',
  });

  successRate.add(healthCheck);
  errorRate.add(!healthCheck);

  sleep(1);

  // 2. Prometheus 메트릭 엔드포인트 확인
  let metricsRes = http.get(`${BASE_URL}/actuator/prometheus`);
  let metricsCheck = check(metricsRes, {
    'metrics endpoint status is 200': (r) => r.status === 200,
    'metrics contain jvm data': (r) => r.body.includes('jvm_'),
  });

  successRate.add(metricsCheck);
  errorRate.add(!metricsCheck);
  apiDuration.add(metricsRes.timings.duration);

  sleep(1);

  // 3. 추가 API 엔드포인트 테스트 (예시)
  // 실제 API 엔드포인트로 변경해야 합니다
  // let apiRes = http.get(`${BASE_URL}/api/your-endpoint`);
  // let apiCheck = check(apiRes, {
  //   'API status is 200': (r) => r.status === 200,
  // });
  // successRate.add(apiCheck);
  // errorRate.add(!apiCheck);

  sleep(2);
}

// 테스트 시작 시 실행
export function setup() {
  console.log(`Starting load test against ${BASE_URL}`);
  console.log('Test will run for approximately 3.5 minutes');
}

// 테스트 종료 시 실행
export function teardown(data) {
  console.log('Load test completed');
}
