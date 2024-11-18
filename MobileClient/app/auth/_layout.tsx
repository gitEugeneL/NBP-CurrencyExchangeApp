import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { Colors } from '../../UI/styles';

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.black} />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.black,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="registration" options={{ title: 'Register' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
