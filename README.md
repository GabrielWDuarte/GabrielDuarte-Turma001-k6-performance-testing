# k6-performance-testing

Performance test with Grafana K6

## Descrição
Este projeto implementa testes de performance utilizando Grafana K6 para validar APIs.

## Critérios Implementados
- ✅ Rampa de carga: 10 → 300 VUs em 5 minutos
- ✅ Thresholds: p95 < 5700ms e taxa de erro < 12%
- ✅ Métricas customizadas: TREND e RATE
- ✅ Pipeline GitHub Actions automatizado

## Como executar
```bash
npm install
npm run ci
```

## API Testada
- **Endpoint:** https://jsonplaceholder.typicode.com/posts
- **Método:** GET
- **Validações:** Status 200 e tempo de resposta

## Resultados
Os resultados são salvos em `src/output/dashboard.html` e podem ser visualizados no navegador.