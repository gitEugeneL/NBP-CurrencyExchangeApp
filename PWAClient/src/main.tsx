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
import RegistrationPage from './app/auth/pages/RegistrationPage/RegistrationPage.tsx';
import SuccessPage from './app/auth/pages/SuccessPage/SuccessPage.tsx';

const router = createBrowserRouter(
  [
    // todo
    //  add custom guards

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
        },
        {
          path: 'registration',
          element: <RegistrationPage />
        },
        {
          path: 'success',
          element: <SuccessPage />
        }
      ]
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true
    }
  }
);

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      future={{
        v7_startTransition: true
      }}
      router={router}
    />
  </StrictMode>
);
