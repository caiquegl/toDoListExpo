import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Fab } from '@/components/fab';
import { FormInput } from '@/components/form-input';
import { Modal } from '@/components/modal';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { addTask } from '@/services/tasks-service';
import { TodoFormValues } from '@/types/todo-form';

export function TodosScreenContainer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<TodoFormValues>({
    defaultValues: { title: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => {
    reset();
    setIsModalVisible(false);
  };

  const onSubmit = handleSubmit(async ({ title }) => {
    setIsSubmitting(true);
    await addTask(title);
    reset();
    setIsSubmitting(false);
    handleClose();
  });

  return (
    <ThemedView
      safeArea
      safeAreaEdges={['bottom', 'left', 'right']}
      style={styles.container}
    >
      <View style={styles.fabWrapper}>
        <Fab onPress={handleOpen} />
      </View>
      <Modal visible={isModalVisible} title="Adicionar tarefa" onClose={handleClose}>
        <FormInput
          control={control}
          name="title"
          label="Tarefa"
          placeholder="Digite a tarefa"
          rules={{
            required: 'Informe a tarefa',
            validate: (value) => value.trim().length > 0 || 'Informe a tarefa',
          }}
        />
        <View style={styles.modalActions}>
          <Button label="Fechar" variant="secondary" onPress={handleClose} disabled={isSubmitting} />
          <Button label="Adicionar" onPress={onSubmit} loading={isSubmitting} />
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: Spacing.xl,
  },
  fabWrapper: {
    marginBottom: Spacing.sm,
    marginRight: Spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
});
