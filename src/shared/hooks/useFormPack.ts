import type { FormPack } from '../types/forms';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

import { useMemo } from 'react';

export function useFormPack<T extends FieldValues>(form: UseFormReturn<T>): FormPack<T> {
  return useMemo(
    () => ({
      control: form.control,
      getValues: form.getValues,
      setValue: form.setValue,
      watch: form.watch,
      trigger: form.trigger,
      reset: form.reset,
      setError: form.setError,
      clearErrors: form.clearErrors,
    }),
    [form]
  );
}
