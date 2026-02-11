import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { Modal } from '@/components/modal';
import { Spacing } from '@/constants/theme';
import { EditTaskModalProps } from '@/types/edit-task-modal';
import { TodoFormValues } from '@/types/todo-form';

export function EditTaskModal({ visible, task, isSubmitting, onClose, onSave }: EditTaskModalProps) {
  const { control, handleSubmit, reset } = useForm<TodoFormValues>({
    defaultValues: { title: task?.title ?? '' },
  });

  useEffect(() => {
    reset({ title: task?.title ?? '' });
  }, [reset, task]);

  const handleClose = () => {
    reset({ title: task?.title ?? '' });
    onClose();
  };

  const onSubmit = handleSubmit(({ title }) => {
    if (task) {
      onSave(task.id, title);
    }
  });

  return (
    <Modal visible={visible} title="Editar tarefa" onClose={handleClose}>
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
      <View style={{ flexDirection: 'row', gap: Spacing.sm, justifyContent: 'flex-end' }}>
        <Button label="Fechar" variant="secondary" onPress={handleClose} disabled={isSubmitting} />
        <Button label="Salvar" onPress={onSubmit} loading={isSubmitting} />
      </View>
    </Modal>
  );
}
