import { StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { TaskListItemProps } from '@/types/task-list-item';
import { Radii, Spacing, Typography } from '@/constants/theme';

export function TaskListItem({ task }: TaskListItemProps) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'textMuted');

  return (
    <View style={[styles.container, { backgroundColor: surface, borderColor: border }]}
    >
      <Text style={[styles.title, { color: text }]}>{task.title}</Text>
      <Text style={[styles.status, { color: muted }]}>Pendente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: Spacing.xs,
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
