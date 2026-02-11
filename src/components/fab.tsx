import { Pressable, StyleSheet, Text } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { FabProps } from '@/types/fab';

export function Fab({ onPress, label = '+' }: FabProps) {
  const backgroundColor = useThemeColor({}, 'primary');
  const labelColor = useThemeColor({}, 'onPrimary');
  const shadowColor = useThemeColor({}, 'shadow');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.8 : 1, shadowColor },
      ]}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  label: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 32,
  },
});
