import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { AppProvider } from './Context';
import { QueryProvider } from './Query';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

//const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryProvider>
  </StrictMode>,
);