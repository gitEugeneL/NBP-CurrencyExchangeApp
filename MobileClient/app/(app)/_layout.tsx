import React from 'react';
import { Redirect } from 'expo-router';

export default function MainLayout() {
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
