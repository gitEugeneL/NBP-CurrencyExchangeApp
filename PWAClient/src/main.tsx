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
import BaseLayout from './app/base/BaseLayout/BaseLayout.tsx';
import WalletPage from './app/base/pages/WalletPage/WalletPage.tsx';
import TrackerPage from './app/base/pages/TrackerPage/TrackerPage.tsx';
import RequireAuth from './app/RequireAuth.tsx';
import BuyPage from './app/base/pages/BuyPage/BuyPage.tsx';
import SellPage from './app/base/pages/SellPage/SellPage.tsx';
import TransactionPage from './app/base/pages/TransactionsPage/TransactionPage.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <RequireAuth>
          <BaseLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to='/wallets' replace />
        },
        {
          path: 'wallets',
          element: <WalletPage />
        },
        {
          path: 'tracker',
          element: <TrackerPage />
        },
        {
          path: 'buy',
          element: <BuyPage />
        },
        {
          path: 'sell',
          element: <SellPage />
        },
        {
          path: 'transactions',
          element: <TransactionPage />
        }
      ]
    },
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
    },
    {
      path: '*',
      element: <Navigate to='/auth' replace />
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
  <RouterProvider
    future={{
      v7_startTransition: true
    }}
    router={router}
  />
);
