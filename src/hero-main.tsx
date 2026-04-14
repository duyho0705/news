import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/hero.css';
import HeroPage from './pages/HeroPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroPage />
  </StrictMode>,
);
