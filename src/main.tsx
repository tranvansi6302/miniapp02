import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './locales/i18n'
import App from './App'

const queryClient = new QueryClient();

const devToolConfig = {
  enableSocketLog: true, 
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App devTool={devToolConfig} />
    </QueryClientProvider>
  </StrictMode>,
)

