import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Radii, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ButtonProps } from '@/types/button';

export function Button({ label, onPress, variant = 'primary', disabled, loading }: ButtonProps) {
  const primary = useThemeColor({}, 'primary');
  const onPrimary = useThemeColor({}, 'onPrimary');
  const surfaceAlt = useThemeColor({}, 'surfaceAlt');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'border');
  const indicator = variant === 'primary' ? onPrimary : text;

  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isPrimary ? primary : surfaceAlt,
          borderColor: isPrimary ? primary : border,
          opacity: disabled || loading ? 0.6 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator size="small" color={indicator} /> : null}
        <Text
          style={[
            styles.label,
            { color: isPrimary ? onPrimary : text },
            loading && styles.labelMuted,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.body,
    fontWeight: '600',
  },
  labelMuted: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
