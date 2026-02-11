import { Image } from 'expo-image';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors, Typography } from '@/constants/theme';
import { SplashAnimationProps } from '@/types/splash';

export function SplashAnimation({ message, duration, onFinish }: SplashAnimationProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = useMemo(() => Colors[scheme], [scheme]);
  const scale = useRef(new Animated.Value(0.92)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const entrance = Math.round(duration * 0.7);
    const settle = Math.round(duration * 0.2);
    const rest = duration - entrance - settle;

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.04,
          duration: entrance,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: settle,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: entrance,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -4,
          duration: settle,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: rest,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished && onFinish) {
        onFinish();
      }
    });
  }, [duration, onFinish, scale, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <Image
          source={require('@/assets/images/toDoList-logo-transparent.png')}
          style={styles.logo}
        />
        <Animated.Text
          style={[
            styles.message,
            {
              color: palette.onPrimary,
            },
          ]}
        >
          {message}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    paddingHorizontal: 32,
    paddingVertical: 28,
    borderRadius: 24,
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 280,
    height: 140,
  },
  message: {
    ...Typography.subtitle,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});
