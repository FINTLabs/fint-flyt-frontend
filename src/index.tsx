import React from 'react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './util/locale/i18n';
import {createRoot} from 'react-dom/client';

const container  = document.getElementById('root');

const root = container ? createRoot(container) : null;

root?.render(
  container ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : null
);

reportWebVitals();