import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { Modal } from '@/components/modal';
import { Spacing } from '@/constants/theme';
import { addTask, getTasks } from '@/services/tasks-service';
import { ModalFabProps } from '@/types/modal-fab';
import { TodoFormValues } from '@/types/todo-form';

export function ModalFab({ visible, onClose, onSaved, isSubmitting, setIsSubmitting }: ModalFabProps) {
  const { control, handleSubmit, reset } = useForm<TodoFormValues>({
    defaultValues: { title: '' },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async ({ title }) => {
    setIsSubmitting(true);
    await addTask(title);
    const tasks = await getTasks();
    onSaved(tasks);
    reset();
    setIsSubmitting(false);
    handleClose();
  });

  return (
    <Modal visible={visible} title="Adicionar tarefa" onClose={handleClose}>
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
        <Button label="Adicionar" onPress={onSubmit} loading={isSubmitting} />
      </View>
    </Modal>
  );
}
