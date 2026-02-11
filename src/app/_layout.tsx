import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="splash">
        <Stack.Screen name="splash" options={screenOptions} />
        <Stack.Screen name="index" options={screenOptions} />
        <Stack.Screen name="todos" options={screenOptions} />
      </Stack>
    </SafeAreaProvider>
  );
}
