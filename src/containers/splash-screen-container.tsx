import { router } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { SplashAnimation } from '@/components/splash-animation';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export function SplashScreenContainer() {
  const scheme = useColorScheme() ?? 'light';
  const palette = useMemo(() => Colors[scheme], [scheme]);

  const handleFinish = () => {
    router.replace('/');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: palette.primary }]}>
      <SplashAnimation
        message="Bem-vindo ao toDoList"
        duration={2000}
        onFinish={handleFinish}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
