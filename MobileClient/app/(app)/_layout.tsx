import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAtomValue, useSetAtom } from 'jotai';
import { authState, logoutAtom } from '../../store/auth/auth.state';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import CustomDrawer from '../../modules/CustomDrawer/CustomDrawer';
import { Colors, Fonts, FontSize } from '../../UI/styles';
import MenuButton from '../../modules/CustomDrawer/components/MenuButton/MenuButton';

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
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.blackBlue,
            shadowColor: Colors.blackBlue,
            shadowOpacity: 0,
          },

          headerTitleStyle: {
            color: Colors.white,
            fontFamily: Fonts.regular,
            fontSize: FontSize.size20,
          },

          sceneContainerStyle: {
            backgroundColor: Colors.black,
          },

          headerTitleAlign: 'center',

          headerLeft: () => <MenuButton navigation={navigation} />,
        })}
      >
        <Drawer.Screen name="index" options={{ title: 'Home Page' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
