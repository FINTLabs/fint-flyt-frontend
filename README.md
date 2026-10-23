# FINT Flyt Integration Frontend

[![CI](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml/badge.svg)](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml)

## Om denne applikasjonen

Dette er frontenden til **FINT Flyt** — en integrasjonsplattform som mottar data fra kildeapplikasjoner (fagsystemer), lar brukeren omforme det etter en konfigurasjonstemplate og sender det videre til arkiv.

Frontenden snakker med flere backend-tjenester via `/api/intern/...`.

## Arkitektur

Kodebasen er organisert etter funksjonsområder:

- `src/features/` — domenelogikk per område (f.eks. `configuration`, `integrations`, `instances`, `valueConverting`, `userAccess`, `dashboard`, `changelog`).
- `src/pages/` — sider som kobler features til ruter, med et generelt layout og sideoppsett.
- `src/routes/` — rutedefinisjoner.
- `src/shared/` — felles UI, context, i18n og API-lag.

API-kall går via repositories i `src/shared/api/` (én per backend-tjeneste) gjennom `ApiAdapterContext`. Lokalt proxies Vite `/api/intern/...` til localhost-porter satt opp med `npm run forward` (`vite.config.ts` + `startUpForwards.sh`).


## Kjør opp applikasjonen lokalt

### Første gang du skal starte appen lokalt

Gjør dette én gang (eller når context, namespace eller token endres):

1. **Installer avhengigheter** (krever Node ≥ 24):
   ```bash
   npm install
   ```
2. **Kubernetes context**  
   Sjekk at du kjører riktig Kubernetes environment:
   ```bash
   kubectl config use-context aks-beta-fint-2021-11-23
   ```
3. **Set riktig namespace**  
   Bekreft at namespace er satt til `fintlabs-no`:
   ```bash
   kubectl config set-context --current --namespace="fintlabs-no"
   ```
4. **Sjekk proxy satt i Vite**  
   Sjekk at proxy-URL-ene i `vite.config.ts` samsvarer med namespacet, altså `/beta/fintlabs-no`.
5. **Miljøvariabler**  
   Kopier eksempel-filen og fyll inn verdiene:
   ```bash
   cp env.local.example .env.local
   ```
   `.env.local` er gitignoret og skal ikke committes. Oppdater tokenet når det utløper.

### Hver gang du skal starte appen lokalt

1. **Port-forward til API i beta**  
   Setter opp `kubectl port-forward` fra maskinen din til Flyt-API-ene i Kubernetes (beta, namespace `fintlabs-no`):
   ```bash
   npm run forward
   ```
   Stopp når du er ferdig:
   ```bash
   npm run forward-stop
   ```
2. **Start applikasjonen**
   ```bash
   npm start
   ```
   Appen kjører typisk på `http://localhost:3000`.
3. **Sett inn aktivt access token**  
   Oppdater `VITE_ACCESS_TOKEN` i `.env.local` med et gyldig token. Når tokenet utløper, må du bytte det ut før appen kan snakke med API-ene igjen.
 

### Tester

Prosjektet har to typer tester:

#### Enhetstester (Vitest)

Enhetstestene ligger under `src/__tests__/unit/` og tester rene funksjoner og logikk (f.eks. validering og URL-mal-hjelpere) uten å starte hele appen.

```bash
# Watch-modus (kjører på nytt ved endringer)
npm test

# Én gang (f.eks. i CI)
npm test -- --run

# Én spesifikk fil
npm test -- --run src/__tests__/unit/url-template-utils.test.ts
```

#### Cypress (ende-til-ende)

Cypress-testene ligger under `cypress/e2e/` og tester brukerflyter i nettleseren. De mocker API-kall med fixtures, så du trenger ikke port-forward mot beta.

Start appen lokalt først (`npm start`, typisk på `http://localhost:3000`), deretter:

```bash
# Interaktivt (anbefalt under utvikling)
npm run cy:open

# Headless (alle e2e-tester)
npm run cypress
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

<div className={styles.container}>...</div>;
```

Ved styling av tredjepartskomponenter (f.eks. NAV Designsystemet) kan `:global(...)` brukes ved behov:

```css
.container :global(.navds-accordion__header) {
    padding: var(--a-spacing-1);
}
```

### Retningslinjer for ikoner

Applikasjonen benytter ikoner fra NAV Aksel (`@navikt/aksel-icons`).

For å gjøre det enklere å bytte ikonbibliotek og holde imports konsistente, skal ikoner importeres fra den felles ikon-modulen:

```tsx
import { PlusIcon } from '../components/icons';
```

og ikke direkte fra:

```tsx
import { PlusIcon } from '@navikt/aksel-icons';
```

Det er satt opp ESLint-regler som skal bidra til å håndheve dette.
