import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './assets/styles/index.pcss';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';
import AuthLayout from './app/auth/AuthLayout/AuthLayout.tsx';
import LoginPage from './app/auth/pages/LoginPage/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='login' replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  }
]);

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
