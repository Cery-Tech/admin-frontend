import type { RawCreateParams, ZodSchema } from 'zod';

import { z } from 'zod';

export function zodSchema<T>(
  schema: {
    [K in keyof T]: ZodSchema<T[K]>;
  },
  options?: RawCreateParams
) {
  return z.object(schema, options);
}

export function typedObject<T>(obj: { [K in keyof T]: ZodSchema<T[K]> }) {
  return obj;
}
