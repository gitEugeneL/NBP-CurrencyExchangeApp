import { useAtomValue, useSetAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import { authState, logoutAtom } from '../store/auth/auth.state.ts';
import { ReactNode } from 'react';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { accessToken, expiresDate } = useAtomValue(authState);
  const logout = useSetAtom(logoutAtom);

  if (
    accessToken === null ||
    expiresDate === null ||
    new Date() <= expiresDate
  ) {
    if (expiresDate !== null) {
      logout();
    }
    return <Navigate to='/auth/login' />;
  }

  return children;
}
