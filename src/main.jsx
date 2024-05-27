import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/app';
import { store } from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <React.Suspense>
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);
