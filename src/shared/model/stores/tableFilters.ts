import type { ColumnFiltersState } from '@tanstack/react-table';

import { create } from 'zustand';

type TableFilterStore = {
  filters: ColumnFiltersState;
  setFilters: (
    filters: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
  ) => void;
};

export const createTableFilter = function () {
  const useFilterStore = create<TableFilterStore>()((set, get) => ({
    filters: [],
    setFilters: (filters) =>
      set({ filters: typeof filters === 'function' ? filters(get().filters) : filters }),
  }));

  const useFilter = () => {
    const columnFilters = useFilterStore((state) => state.filters);
    const onChangeColumnFilters = useFilterStore((state) => state.setFilters);

    return { columnFilters, onChangeColumnFilters };
  };

  return {
    useFilter,
    useFilterStore,
  };
};
