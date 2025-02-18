import type { FieldValues, UseFormReturn } from 'react-hook-form';

export type FormPack<
  T extends FieldValues,
  Fields extends keyof UseFormReturn<T> =
    | 'control'
    | 'setValue'
    | 'getValues'
    | 'watch'
    | 'reset'
    | 'trigger'
    | 'clearErrors'
    | 'setError',
> = Pick<UseFormReturn<T>, Fields>;
