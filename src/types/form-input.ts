import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type FormInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};
