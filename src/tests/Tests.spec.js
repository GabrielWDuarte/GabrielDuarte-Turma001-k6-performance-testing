import http from 'k6/http';
import { check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Métricas customizadas
const getTrend = new Trend('http_req_duration_get');
const getRate = new Rate('http_req_success_rate');

// Configurações do teste
export const options = {
  stages: [
    { duration: '1m', target: 10 }, // Inicia com 10 VUs
    { duration: '2m', target: 100 }, // Cresce para 100 VUs
    { duration: '1m', target: 200 }, // Cresce para 200 VUs
    { duration: '1m', target: 300 } // Máximo de 300 VUs
  ],
  thresholds: {
    http_req_duration: ['p(95)<5700'], // 95% abaixo de 5700ms
    http_req_failed: ['rate<0.12'] // Menos de 12% de erro
  }
};

export default function () {
  // Requisição GET para a API
  const response = http.get('https://jsonplaceholder.typicode.com/posts');

  // Validações
  const success = check(response, {
    'status is 200': r => r.status === 200,
    'response time < 5700ms': r => r.timings.duration < 5700
  });

  // Métricas customizadas
  getTrend.add(response.timings.duration);
  getRate.add(success);
}
