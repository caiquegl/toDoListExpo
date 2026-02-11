import { Stack } from 'expo-router';

const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="splash" options={screenOptions} />
      <Stack.Screen name="index" options={screenOptions} />
    </Stack>
  );
}
