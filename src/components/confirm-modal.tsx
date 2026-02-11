import { Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ConfirmModalProps } from '@/types/confirm-modal';

export function ConfirmModal({
  visible,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const muted = useThemeColor({}, 'textMuted');

  return (
    <Modal visible={visible} title={title} onClose={onCancel}>
      {description ? (
        <Text style={[styles.description, { color: muted }]}>{description}</Text>
      ) : null}
      <View style={styles.actions}>
        <Button label={cancelLabel} variant="secondary" onPress={onCancel} />
        <Button label={confirmLabel} onPress={onConfirm} />
      </View>
    </Modal>
  );
}

const styles = {
  description: {
    ...Typography.body,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
} as const;
