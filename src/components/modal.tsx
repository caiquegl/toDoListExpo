import { Pressable, Modal as RNModal, StyleSheet, Text, View } from 'react-native';

import { Radii, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ModalProps } from '@/types/modal';

export function Modal({ visible, title, onClose, children }: ModalProps) {
  const overlay = useThemeColor({}, 'overlay');
  const surface = useThemeColor({}, 'surface');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'border');

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: overlay }]} onPress={onClose}>
        <View style={styles.center}>
          <Pressable
            style={[styles.card, { backgroundColor: surface, borderColor: border }]}
            onPress={() => {}}
          >
            <Text style={[styles.title, { color: text }]}>{title}</Text>
            {children}
          </Pressable>
        </View>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
  },
  title: {
    ...Typography.subtitle,
    fontWeight: '700',
  },
});
