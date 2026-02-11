import { FlatList, StyleSheet, Text, View } from 'react-native';

import { TaskListItem } from '@/components/task-list-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TaskListProps } from '@/types/task-list';
import { Spacing, Typography } from '@/constants/theme';

export function TaskList({ tasks }: TaskListProps) {
  const muted = useThemeColor({}, 'textMuted');

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskListItem task={item} />}
      contentContainerStyle={[styles.list, tasks.length === 0 && styles.emptyList]}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: muted }]}>Nenhuma tarefa ainda</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  emptyText: {
    ...Typography.body,
  },
});
