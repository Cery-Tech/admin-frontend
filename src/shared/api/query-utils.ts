import { getQueryClient } from './queryClient';

/**
 * Util to invalidate single or multiple queries.
 * Last argument can be a boolean value which will be passed to 'exact' option
 */
export const invalidateQueries = (...queryKeys: (unknown[] | boolean)[]) => {
  const lastItem = queryKeys[queryKeys.length - 1];
  const exact: boolean | undefined = typeof lastItem === 'boolean' ? lastItem : undefined;
  const client = getQueryClient();

  queryKeys.forEach((key) => {
    if (typeof key === 'boolean') {
      return;
    }
    client.invalidateQueries({ queryKey: key, exact }, { cancelRefetch: true });
  });
};

/**
 * Util to invalidate queries after request is resolved.
 */
export const withInvalidation = async <ResponseType>(
  requestPromise: Promise<ResponseType>,
  queryKeys: (unknown[] | boolean)[]
) => {
  const response = await requestPromise;

  invalidateQueries(...queryKeys);

  return response;
};
