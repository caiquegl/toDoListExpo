import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Fab } from '@/components/fab';
import { ModalFab } from '@/components/modal-fab';
import { TaskList } from '@/components/task-list';
import { ThemedView } from '@/components/themed-view';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getTasks, removeTask, toggleTask } from '@/services/tasks-service';
import { Task } from '@/types/task';

export function TodosScreenContainer() {
  const textColor = useThemeColor({}, 'text');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCount, setTasksCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasks();
      setTasks(data);
      setTasksCount(data.length);
    };

    loadTasks();
  }, []);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const handleSaved = (nextTasks: Task[]) => {
    setTasks(nextTasks);
    setTasksCount(nextTasks.length);
  };

  const handleToggle = async (id: string) => {
    const nextTasks = await toggleTask(id);
    setTasks(nextTasks);
  };

  const handleRemove = async (id: string) => {
    const nextTasks = await removeTask(id);
    setTasks(nextTasks);
    setTasksCount(nextTasks.length);
  };

  return (
    <ThemedView
      safeArea
      safeAreaEdges={['top', 'bottom', 'left', 'right']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: textColor }]}>
        Lista de Tarefas ({tasksCount})
      </Text>
      <View style={styles.listWrapper}>
        <TaskList tasks={tasks} onToggle={handleToggle} onRemove={handleRemove} />
      </View>
      <View style={styles.fabWrapper}>
        <Fab onPress={handleOpen} />
      </View>
      <ModalFab
        visible={isModalVisible}
        onClose={handleClose}
        onSaved={handleSaved}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: Spacing.xl,
  },
  title: {
    ...Typography.title,
    textAlign: 'center',
    marginVertical: Spacing.xxl,
  },
  listWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    padding: Spacing.lg
  },
  fabWrapper: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.sm,
    marginRight: Spacing.md,
  },
});
