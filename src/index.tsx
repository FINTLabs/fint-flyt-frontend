import App from './App';
import reportWebVitals from './reportWebVitals';
import './util/locale/i18n.ts';
import ReactDOM from 'react-dom/client';
import "@navikt/ds-css";

const container = document.getElementById('root');
console.log("found container:", container);
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App/>);
}

reportWebVitals();
