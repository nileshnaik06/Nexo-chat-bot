import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './components/loader/loader.jsx'

const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader message="Starting app"/>}>
      <App />
    </Suspense>
  </StrictMode>,
)
