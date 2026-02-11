import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Stack initialRouteName="splash">
          <Stack.Screen name="splash" options={screenOptions} />
          <Stack.Screen name="index" options={screenOptions} />
          <Stack.Screen name="todos" options={screenOptions} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
