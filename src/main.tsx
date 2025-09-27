import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DyslexiaAlgebraApp from './DyslexiaAlgebraApp.tsx'
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DyslexiaAlgebraApp />
  </StrictMode>,
)
