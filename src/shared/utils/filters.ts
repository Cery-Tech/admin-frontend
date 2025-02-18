export enum ValuesFilter {
  Array = 'EMPTY_ARRAY',
  Object = 'EMPTY_OBJECT',
}

export const filterObjectValues = function <T extends Record<string, unknown>>(
  targetObject: T,
  exclude: (null | string | boolean | number | undefined)[] = [],
  truthy = false
): Partial<T> {
  return Object.entries(targetObject || {}).reduce((acc, [key, value]) => {
    if (truthy && Boolean(value)) {
      return { ...acc, [key]: value };
    }
    if (!exclude.includes(value as never)) {
      // Exculde empty arrays
      if (Array.isArray(value) && exclude.includes(ValuesFilter.Array) && !value.length) {
        return acc;
      }
      // Exculde empty objects
      if (
        typeof value === 'object' &&
        value !== null &&
        exclude.includes(ValuesFilter.Object) &&
        !Object.keys(value).length
      ) {
        return acc;
      }

      return { ...acc, [key]: value };
    }

    return acc;
  }, {});
};

export const getQueryNumberFilters = (query: URLSearchParams | null) => (key: string) => {
  const value = query?.get(key);

  return value ? value.split(',').map(Number) : [];
};

export const getQueryStringListFilter =
  (query: URLSearchParams | null) =>
  <Type extends string>(key: string): Type[] => {
    const value = query?.get(key);

    return value ? (value.split(',') as Type[]) : [];
  };

type ParseQueryFn<T> = (query: URLSearchParams | null) => T;

export class FilterUtil<T extends Record<string, unknown>> {
  private defaultFilters: T;
  parseQuery: ParseQueryFn<T>;

  constructor({
    defaultFilters,
    parseQuery,
  }: // filters?: Partial<T>,
  {
    defaultFilters: T;
    parseQuery: (query: URLSearchParams | null) => T;
  }) {
    // if (!filters) {
    //   return;
    // }
    this.defaultFilters = defaultFilters;
    this.parseQuery = parseQuery;
    // for (const key in filters) {
    //   if (!Object.hasOwn(this.defaultFilters, key)) {
    //     break;
    //   }
    //   const _key = key as keyof CatalogSearchFilter;

    //   // @ts-expect-error
    //   this.defaultFilters[_key] = filters[_key] ?? this.defaultFilters[_key];
    // }
  }

  getDefault = (): T => {
    return this.defaultFilters;
  };

  sortedFiltersList = (filters: Partial<T>) =>
    Object.entries(filters).sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase())) as [
      keyof T,
      T[keyof T],
    ][];

  uniqueFilters = (newFilters: Partial<T>) => {
    return Object.entries(newFilters).reduce(
      (acc, data) => {
        const [key, value] = data as [keyof T, T[keyof T]];

        if (this.defaultFilters[key] === value) {
          delete acc[key];
        }

        if (Array.isArray(value) && value.length === 0) {
          delete acc[key];
        }

        return acc;
      },
      { ...newFilters }
    );
  };

  createQuery = (filters: Partial<T>) => {
    return this.sortedFiltersList(filters).reduce((acc, [key, value]) => {
      if (!value || (Array.isArray(value) && !value.length)) {
        return acc;
      }

      if (Array.isArray(value)) {
        if (value.length) {
          acc.set(key as string, value.join(','));
        }
      }

      if (typeof value === 'number' || typeof value === 'string') {
        acc.set(key as string, String(value));
      }

      return acc;
    }, new URLSearchParams());
  };
}
