import type { DragItem } from '../drag-and-drop';
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  GlobalFilterTableState,
  OnChangeFn,
  RowData,
  TableMeta,
} from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, useCallback, useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { DraggableItem } from '../drag-and-drop';
import { DefaultTableFilter } from './filter';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    headerClassName?: string;
  }
}

type DataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: TableMeta<TData>;
  columnFilters?: ColumnFiltersState;
  onChangeColumnFilters?: OnChangeFn<ColumnFiltersState>;
  globalFilter?: GlobalFilterTableState;
  onChangeGlobalFilter?: OnChangeFn<GlobalFilterTableState>;
  getRowId?: (row: TData) => string;
  keyProperty: keyof TData;
  Filter?: React.ComponentType<{ column: Column<TData, TValue> }>;
  enableColumnFilters?: boolean;
  headRowClassName?: string;
} & (
  | {
      dragEnabled: true;
      dragGroupName: string;
      getDragIndex: (row: TData) => number;
      onReorder: (prevIndex: DragItem, nextIndex: DragItem) => void;
      getUniqueRowId: (row: TData) => string | number;
    }
  | { dragEnabled?: false | undefined }
);

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  meta,
  columnFilters,
  onChangeColumnFilters,
  globalFilter,
  onChangeGlobalFilter,
  getRowId,
  keyProperty,
  Filter = DefaultTableFilter,
  enableColumnFilters = true,
  headRowClassName,
  ...props
}: DataTableProps<TData, TValue>) {
  const getId = useCallback((row: TData) => String(row[keyProperty!]), [keyProperty]);

  const _columns = useMemo(
    () => [
      {
        accessorKey: 'order_num',
        header: '#',
        cell: ({ row }) => <div>{row.index + 1}</div>,
        size: 40,
        enableColumnFilter: false,
        meta: {
          className: 'border-r w-12 max-w-12 text-right',
          headerClassName: 'w-12 max-w-12 text-right h-6',
        },
      } satisfies ColumnDef<TData, TValue>,
      ...columns,
    ],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: _columns,
    getCoreRowModel: getCoreRowModel(),
    enableExpanding: true,
    enableSorting: true,
    getRowId: getRowId ?? getId,
    enableGlobalFilter: true,
    enableColumnFilters,
    meta,
    onColumnFiltersChange: onChangeColumnFilters,
    onGlobalFilterChange: onChangeGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="rounded-md border flex flex-col overflow-auto max-h-[calc(100dvh-180px)]">
      <Table className="flex-[1_0_0] table-fixed">
        <TableHeader className="sticky top-0 z-[2] bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id}>
              <TableRow key={headerGroup.id} className={cn('border-b-1 h-10', headRowClassName)}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.column.id}
                      className={cn('z-[2]', header.column.columnDef.meta?.headerClassName)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
              {enableColumnFilters ? (
                <TableRow key={headerGroup.id + 'filters'}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="h-10">
                        {header.column.getCanFilter() && Filter ? (
                          <div>
                            <Filter column={header.column as Column<TData, TValue>} />
                          </div>
                        ) : null}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ) : null}
            </Fragment>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) =>
              props.dragEnabled ? (
                <DraggableItem
                  key={row.id}
                  Content={({ children }) => <>{children}</>}
                  Wrapper={TableRow}
                  acceptTarget={props.dragGroupName}
                  data-state={row.getIsSelected() && 'selected'}
                  dragIndex={props.getDragIndex(row.original)}
                  uniqueId={props.getUniqueRowId(row.original)}
                  onChangeOrder={props.onReorder}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </DraggableItem>
              ) : (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={_columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
