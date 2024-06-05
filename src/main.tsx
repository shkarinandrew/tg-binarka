import './index.css';

import { SDKProvider } from '@tma.js/sdk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SDKProvider debug>
      <App />
    </SDKProvider>
  </React.StrictMode>,
);
