import { Controller, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Radii, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FormInputProps } from '@/types/form-input';

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
}: FormInputProps<TFieldValues>) {
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'textMuted');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const danger = useThemeColor({}, 'danger');

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <Text style={[styles.label, { color: text }]}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={muted}
            style={[
              styles.input,
              {
                borderColor: error ? danger : border,
                color: text,
                backgroundColor: surface,
              },
            ]}
          />
          {error?.message ? (
            <Text style={[styles.error, { color: danger }]}>{error.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
  },
  error: {
    ...Typography.caption,
  },
});
