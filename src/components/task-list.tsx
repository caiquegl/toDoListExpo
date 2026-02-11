import { StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

import { TaskListItem } from '@/components/task-list-item';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Task } from '@/types/task';
import { TaskListProps } from '@/types/task-list';

export function TaskList({ tasks, onToggle, onRemove, onReorder }: TaskListProps) {
  const muted = useThemeColor({}, 'textMuted');

  return (
    <DraggableFlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      onDragEnd={({ data }) => onReorder(data)}
      renderItem={({ item, drag, isActive }: RenderItemParams<Task>) => (
        <TaskListItem
          task={item}
          onToggle={onToggle}
          onRemove={onRemove}
          onDrag={drag}
          isActive={isActive}
        />
      )}
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
