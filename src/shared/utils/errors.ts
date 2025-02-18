export const withError = async function <SuccessType = void, ErrorType extends Error = Error>(
  execution: () => SuccessType | Promise<SuccessType>
) {
  try {
    const result = await execution();

    return [result, null] as const;
  } catch (error) {
    return [null, error as ErrorType] as const;
  }
};

export const throwable = function <SuccessType, ErrorType extends Error = Error>(
  execution: () => SuccessType
) {
  try {
    const result = execution();

    return [result, null] as const;
  } catch (error) {
    return [null, error as ErrorType] as const;
  }
};

export function isNativeError(value: unknown): value is Error {
  return value instanceof Error || Object.prototype.toString.call(value).includes('Error');
}

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

export const getValidationErrors = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray(error.errors)
  ) {
    return error.errors;
  }

  return [];
};

// regex to find [field] at the beginning of the string
const fieldRegex = /^\[(\w+)\]/;

export const parseApiValidationErrors = (errors: string[]) => {
  return errors.reduce(
    (acc, error) => {
      const field = fieldRegex.exec(error)?.[1] ?? '';
      const message = error.replace(fieldRegex, '');

      acc.map[field] = message;
      acc.list.push(message);

      return acc;
    },
    {
      map: {} as Record<string, string>,
      list: [] as string[],
    }
  );
};

export const errorOrValidationErrors = (error: unknown) => {
  const errors = getValidationErrors(error);

  if (errors.length) {
    return parseApiValidationErrors(errors).list[0];
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (isNativeError(error)) {
    return error.message;
  }

  return `Unknown error: ${JSON.stringify(error)}`;
};
