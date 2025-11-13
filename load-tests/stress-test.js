import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

// 스트레스 테스트 - 시스템 한계점 찾기
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // 50명
    { duration: '1m', target: 100 },  // 100명
    { duration: '2m', target: 200 },  // 200명
    { duration: '2m', target: 300 },  // 300명 (한계 테스트)
    { duration: '1m', target: 0 },    // 복구
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 극한 상황이므로 2초까지 허용
    errors: ['rate<0.5'],               // 에러율 50% 이하
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  const res = http.get(`${BASE_URL}/actuator/health`);

  const result = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

export function setup() {
  console.log('Starting STRESS test - finding system limits');
  console.log('WARNING: This test will push your system to its limits');
}
