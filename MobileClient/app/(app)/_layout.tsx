import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAtomValue, useSetAtom } from 'jotai';
import { authState, logoutAtom } from '../../store/auth.state';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function MainLayout() {
  const { accessToken, expiresDate } = useAtomValue(authState);
  const logout = useSetAtom(logoutAtom);

  const [loaded, error] = useFonts({
    InterRegular: require('../../assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  if (accessToken === null || expiresDate === null || new Date() <= expiresDate) {
    if (expiresDate !== null) {
      logout();
    }
    return <Redirect href="/auth/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: 'Home Page' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
