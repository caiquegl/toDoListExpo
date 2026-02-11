import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConfirmModal } from '@/components/confirm-modal';
import { Radii, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TaskListItemProps } from '@/types/task-list-item';

export function TaskListItem({ task, onToggle, onRemove, onDrag, isActive }: TaskListItemProps) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'textMuted');
  const success = useThemeColor({}, 'success');
  const danger = useThemeColor({}, 'danger');
  const [confirmType, setConfirmType] = useState<'toggle' | 'remove' | null>(null);

  const isDone = task.status === 'done';
  const statusLabel = isDone ? 'Concluída' : 'Pendente';
  const confirmTitle =
    confirmType === 'remove'
      ? 'Excluir tarefa'
      : isDone
        ? 'Reabrir tarefa'
        : 'Concluir tarefa';
  const confirmDescription =
    confirmType === 'remove'
      ? 'Deseja realmente excluir esta tarefa?'
      : isDone
        ? 'Deseja reabrir esta tarefa?'
        : 'Deseja marcar esta tarefa como concluída?';
  const confirmLabel =
    confirmType === 'remove'
      ? 'Excluir'
      : isDone
        ? 'Reabrir'
        : 'Concluir';

  const handleConfirm = () => {
    if (confirmType === 'remove') {
      onRemove(task.id);
    }
    if (confirmType === 'toggle') {
      onToggle(task.id);
    }
    setConfirmType(null);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: surface, borderColor: border, opacity: isActive ? 0.7 : 1 },
        ]}
      >
        <View style={styles.mainRow}>
          <Pressable onLongPress={onDrag} style={styles.dragHandle}>
            <MaterialIcons name="drag-handle" size={22} color={muted} />
          </Pressable>
          <View style={styles.content}>
            <Text style={[styles.title, { color: text }]}>{task.title}</Text>
            <Text style={[styles.status, { color: muted }]}>{statusLabel}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => setConfirmType('toggle')}>
            <MaterialIcons
              name={isDone ? 'check-circle' : 'radio-button-unchecked'}
              size={22}
              color={success}
            />
          </Pressable>
          <Pressable onPress={() => setConfirmType('remove')}>
            <MaterialIcons name="delete-outline" size={22} color={danger} />
          </Pressable>
        </View>
      </View>
      <ConfirmModal
        visible={confirmType !== null}
        title={confirmTitle}
        description={confirmDescription}
        confirmLabel={confirmLabel}
        cancelLabel="Cancelar"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmType(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Radii.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dragHandle: {
    paddingRight: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
  },
  status: {
    ...Typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
