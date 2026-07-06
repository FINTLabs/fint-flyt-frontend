
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

### Start applikasjonen lokalt
```bash
npm start
```

### Kjør testene
```bash
npm run test
```


## Styling

Prosjektet er i en overgangsfase der vi gradvis flytter styling fra inline CSS (`style={{ ... }}`) og globale CSS-filer til CSS Modules (`*.module.css`).

### Hvorfor?

Målet er å kunne bruke en strengere Content Security Policy (CSP). Inline styles krever at CSP tillater:
```http
style-src 'unsafe-inline'
```

Ved å flytte styling til CSS Modules får vi:

- Bedre sikkerhet gjennom en strengere CSP
- Mindre global CSS og færre stilkollisjoner
- Tydeligere kobling mellom komponenter og tilhørende styling
- En mer feature-orientert struktur


### Retningslinjer


Applikasjonen benytter primært komponenter og design tokens fra NAV Aksel. Styling bør derfor i størst mulig grad løses ved hjelp av:

- Aksel-komponenter
- Aksel sine styling properties (`padding`, `margin`, `gap`, osv.)
- Aksel sine CSS-variabler (`--a-*`)


CSS Modules bør først tas i bruk når det er behov for styling som ikke kan løses på en hensiktsmessig måte gjennom Aksel alene.

Ny styling bør som hovedregel legges i en CSS Module ved siden av komponenten:


```text
MyComponent.tsx
MyComponent.module.css
```

Eksempel:

```tsx
import styles from './MyComponent.module.css';

<div className={styles.container}>...</div>
```

Ved styling av tredjepartskomponenter (f.eks. NAV Designsystemet) kan `:global(...)` brukes ved behov:

```css
.container :global(.navds-accordion__header) {
    padding: var(--a-spacing-1);
}
```

### Utfasing av MUI

Prosjektet er i ferd med å fases bort fra Material UI (MUI), inkludert `@mui/material` og `@mui/icons-material`.

Ved nyutvikling skal Aksel-komponenter og Aksel-ikoner benyttes der tilsvarende funksjonalitet finnes.

Det finnes fortsatt enkelte MUI-ikoner i løsningen der det foreløpig ikke finnes gode alternativer i Aksel. Disse eksponeres gjennom den felles ikon-modulen slik at de senere kan erstattes uten å endre imports i resten av kodebasen.

### Retningslinjer for ikoner

Applikasjonen benytter primært ikoner fra NAV Aksel (`@navikt/aksel-icons`).

For å gjøre det enklere å bytte ikonbibliotek og holde imports konsistente, skal ikoner importeres fra den felles ikon-modulen:

```tsx
import { PlusIcon, SearchIcon } from '../components/icons';
```

og ikke direkte fra:

```tsx
import { PlusIcon } from '@navikt/aksel-icons';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
```

Det er satt opp ESLint-regler som skal bidra til å håndheve dette.




