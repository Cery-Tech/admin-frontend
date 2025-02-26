import type { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import DebouncedInput from '../inputs/DebouncedInput';

type Props<TData, TValue = unknown> = {
  column: Column<TData, TValue>;
};

export function DefaultTableFilter<TData, TValue = unknown>({ column }: Props<TData, TValue>) {
  const value = String(column.getFilterValue() || '');

  return (
    <DebouncedInput
      className={cn(
        'w-full p-2 py-0 h-8 text-sm',
        value ? 'bg-primary text-primary-foreground' : ''
      )}
      placeholder={`${column.columnDef.header}`}
      throttleTimeout={250}
      value={value}
      onChangeThrottled={column.setFilterValue}
    />
  );
}
