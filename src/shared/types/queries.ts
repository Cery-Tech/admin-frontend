import type { DefaultError, UseQueryOptions as TanstackQueryOptions } from '@tanstack/react-query';

export type UseNonRequiredQueryOptions<ResponseType, HookReturnType = ResponseType> = Omit<
  TanstackQueryOptions<ResponseType, DefaultError, HookReturnType>,
  'queryKey' | 'queryFn'
>;
