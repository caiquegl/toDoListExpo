import { render } from '@testing-library/react-native';

import { TaskList } from '@/components/task-list';
import { Task } from '@/types/task';

jest.mock('react-native-draggable-flatlist', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ data, renderItem, ListEmptyComponent }: { data: Task[]; renderItem: any; ListEmptyComponent?: React.ReactNode }) => (
    <View>
      {data.length === 0 ? ListEmptyComponent : null}
      {data.map((item: Task, index: number) => (
        <View key={item.id}>
          {renderItem({ item, drag: () => {}, isActive: false, index })}
        </View>
      ))}
    </View>
  );
});

describe('TaskList', () => {
  it('renders empty state', () => {
    const { getByText } = render(
      <TaskList tasks={[]} onToggle={() => {}} onRemove={() => {}} onReorder={() => {}} onEdit={() => {}} />
    );
    expect(getByText('Nenhuma tarefa ainda')).toBeTruthy();
  });

  it('renders a task item', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Teste', status: 'pending', createdAt: 1 },
    ];
    const { getByText } = render(
      <TaskList tasks={tasks} onToggle={() => {}} onRemove={() => {}} onReorder={() => {}} onEdit={() => {}} />
    );
    expect(getByText('Teste')).toBeTruthy();
  });
});
