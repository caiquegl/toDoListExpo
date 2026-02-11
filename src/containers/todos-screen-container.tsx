import { StyleSheet, View } from 'react-native';

import { Fab } from '@/components/fab';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export function TodosScreenContainer() {
  return (
    <ThemedView
      safeArea
      safeAreaEdges={['bottom', 'left', 'right']}
      style={styles.container}
    >
      <View style={styles.fabWrapper}>
        <Fab onPress={() => {}} />
      </View>
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
});
