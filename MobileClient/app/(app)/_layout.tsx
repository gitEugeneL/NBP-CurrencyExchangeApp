import React, { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAtomValue, useSetAtom } from 'jotai';
import { authState, logoutAtom } from '../../store/auth/auth.state';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text } from 'react-native';
import CustomDrawer from '../../modules/CustomDrawer/CustomDrawer';
import { Colors, Fonts, FontSize } from '../../UI/styles';
import HeaderButton from '../../modules/CustomDrawer/components/HeaderButton/HeaderButton';
import { WalletIcon } from '../../assets/icons/WalletIcon';
import { TrackerIcon } from '../../assets/icons/TrackerIcon';
import { ArrowIcon } from '../../assets/icons/ArrowIcon';

SplashScreen.preventAutoHideAsync();

const routes = {
  wallets: { name: 'My Wallets', path: 'index', icon: <WalletIcon /> },
  tracker: { name: 'Tracker', path: 'tracker', icon: <TrackerIcon /> },
  buy: { name: 'Buy currency', path: 'buy', icon: <ArrowIcon /> },
  sell: { name: 'Sell currency', path: 'sell', icon: <ArrowIcon /> },
};

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
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBlue} />

      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} routes={Object.values(routes)} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.blackBlue,
            shadowColor: Colors.blackBlue,
            shadowOpacity: 0,
          },

          headerLeft: () => <HeaderButton navigation={navigation} />,
        })}
      >
        <Drawer.Screen
          name={routes.wallets.path}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>{routes.wallets.name}</Text>,
          }}
        />

        <Drawer.Screen
          name={routes.tracker.path}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>{routes.tracker.name}</Text>,
          }}
        />

        <Drawer.Screen
          name={routes.buy.path}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>{routes.buy.name}</Text>,
          }}
        />

        <Drawer.Screen
          name={routes.sell.path}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>{routes.sell.name}</Text>,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size20,
  },
});
