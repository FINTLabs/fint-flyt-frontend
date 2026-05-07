
# FINT Flyt Integration Frontend  
[![CI](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml/badge.svg)](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml)

## Kjør opp applikasjonen lokalt

### Port-forward til api i beta

1. **Kubernetes context**  
   Sjekk at du kjører riktig Kubernetes environment:
   ```bash
   kubectl config use-context aks-beta-fint-2021-11-23
   ```
2. **Set riktig namespace**  
   Bekreft at namespace er satt til "fintlabs-no"
   ```bash
   kubectl config set-context --current --namespace="fintlabs-no"
   ```
3. **Sjekk proxy satt i Vite**  
   Sjekk at proxy url-ene i `vite.config.ts` samsvarer med namespacet, altså "/beta/fintlabs-no".

4. **Kjør port-forward**  
   Kjør scriptet i startUpForwards.sh ved å kjøre:
   ```bash
   npm run forward
   ```

   For å stoppe port-forwarding når du er ferdig:
   ```bash
   npm run stop-forward
   ```

### Kjør opp applikasjonen lokalt
```bash
npm start
```

### Kjør testene
```bash
npm run test
```