import App from './App';
import reportWebVitals from './reportWebVitals';
import './util/locale/i18n.ts';
import {createRoot} from 'react-dom/client';
import "@navikt/ds-css";

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App/>);
}

reportWebVitals();
