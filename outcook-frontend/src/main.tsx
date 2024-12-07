import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import ErrorBoundary from './ui/components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ErrorBoundary>
)
