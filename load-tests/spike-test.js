import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

// 스파이크 테스트 - 갑작스러운 트래픽 증가 시뮬레이션
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 10 },   // 워밍업
    { duration: '10s', target: 100 },  // 급격한 증가 (스파이크!)
    { duration: '30s', target: 100 },  // 유지
    { duration: '10s', target: 10 },   // 복구
    { duration: '10s', target: 0 },    // 종료
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 스파이크 시에는 1초까지 허용
    errors: ['rate<0.2'],               // 에러율 20% 이하
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  const res = http.get(`${BASE_URL}/actuator/health`);

  const result = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(0.5);
}

export function setup() {
  console.log('Starting SPIKE test - simulating sudden traffic surge');
}
