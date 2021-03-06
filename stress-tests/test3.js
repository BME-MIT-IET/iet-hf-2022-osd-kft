import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '20s',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<5000'], // 95 percent of response times must be below 5000ms
  },
};

export default function () {
  const res = http.get('http://localhost:8080');
  sleep(1);
}
