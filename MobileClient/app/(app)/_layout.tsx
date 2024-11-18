import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function MainLayout() {
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

  //todo accessToken validation
  return <Redirect href="/auth/login" />;

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <Drawer>
  //       <Drawer.Screen name="index" options={{ title: 'Home Page' }} />
  //     </Drawer>
  //   </GestureHandlerRootView>
  // );
}
