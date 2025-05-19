import { DossierEditor } from '@editor-core/index';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';

const REACT_APP_RENDER_ID = '__dossier-root';
const appRootEl = document.getElementById(REACT_APP_RENDER_ID);

if (appRootEl) {
  const root = ReactDOM.createRoot(appRootEl);
  root.render(
    <React.StrictMode>
      <DossierEditor />
    </React.StrictMode>
  );
}
