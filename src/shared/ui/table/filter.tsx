import type { Column } from '@tanstack/react-table';

import DebouncedInput from '../inputs/DebouncedInput';

type Props<TData, TValue = unknown> = {
  column: Column<TData, TValue>;
};

export function DefaultTableFilter<TData, TValue = unknown>({ column }: Props<TData, TValue>) {
  return (
    <DebouncedInput
      className="w-full p-2 py-0 h-8 border border-gray-300 rounded text-sm"
      placeholder={`${column.columnDef.header}`}
      throttleTimeout={250}
      value={String(column.getFilterValue() || '')}
      onChangeThrottled={column.setFilterValue}
    />
  );
}
