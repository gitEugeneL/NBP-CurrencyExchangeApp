import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './assets/styles/index.pcss';
import Button from './UI/Button/Button.tsx';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <Button name='Hello button' />
    </div>
  </StrictMode>
);
