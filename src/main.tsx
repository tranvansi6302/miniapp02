import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './locales/i18n'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
});

const devToolConfig = {
  enableSocketLog: true,
  enableNativeLog: true,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App devTool={devToolConfig} />
    </QueryClientProvider>
  </StrictMode>,
)

