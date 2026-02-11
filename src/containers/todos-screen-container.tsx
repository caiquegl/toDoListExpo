import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EditTaskModal } from '@/components/edit-task-modal';
import { Fab } from '@/components/fab';
import { ModalFab } from '@/components/modal-fab';
import { TaskList } from '@/components/task-list';
import { ThemedView } from '@/components/themed-view';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { notifyTaskCompleted } from '@/services/notifications';
import { getTasks, removeTask, reorderTasks, toggleTask, updateTask } from '@/services/tasks-service';
import { Task } from '@/types/task';

export function TodosScreenContainer() {
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCount, setTasksCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = (task: Task) => setEditTask(task);

  const handleEditClose = () => setEditTask(null);

  const handleToggle = async (id: string) => {
    const current = tasks.find((task) => task.id === id);
    const nextTasks = await toggleTask(id);
    setTasks(nextTasks);
    if (current?.status === 'pending') {
      await notifyTaskCompleted(current.title);
    }
  };

  const handleRemove = async (id: string) => {
    const nextTasks = await removeTask(id);
    setTasks(nextTasks);
    setTasksCount(nextTasks.length);
  };

  const handleReorder = async (nextTasks: Task[]) => {
    await reorderTasks(nextTasks);
    setTasks(nextTasks);
  };

  const handleEditSave = async (id: string, title: string) => {
    setIsEditing(true);
    const nextTasks = await updateTask(id, title);
    setTasks(nextTasks);
    setIsEditing(false);
    handleEditClose();
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
      <Text style={[styles.helper, { color: mutedColor }]}>Segure o ícone por 1 segundo e arraste para ordenar</Text>
      <View style={styles.listWrapper}>
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onReorder={handleReorder}
          onEdit={handleEdit}
        />
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
      <EditTaskModal
        visible={!!editTask}
        task={editTask}
        isSubmitting={isEditing}
        onClose={handleEditClose}
        onSave={handleEditSave}
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
  helper: {
    ...Typography.caption,
    textAlign: 'center',
    marginBottom: Spacing.sm,
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
