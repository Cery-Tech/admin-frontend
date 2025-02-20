import type { DragItem } from '../drag-and-drop';
import type {
  ColumnDef,
  ColumnFiltersState,
  GlobalFilterTableState,
  OnChangeFn,
  TableMeta,
} from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DraggableItem } from '../drag-and-drop';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: TableMeta<TData>;
  columnFilters?: ColumnFiltersState;
  onChangeColumnFilters?: OnChangeFn<ColumnFiltersState>;
  globalFilter?: GlobalFilterTableState;
  onChangeGlobalFilter?: OnChangeFn<GlobalFilterTableState>;
  getRowId?: (row: TData) => string;
  keyProperty: keyof TData;
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

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  columnFilters,
  onChangeColumnFilters,
  globalFilter,
  onChangeGlobalFilter,
  getRowId,
  keyProperty,
  ...props
}: DataTableProps<TData, TValue>) {
  const getId = useCallback((row: TData) => String(row[keyProperty!]), [keyProperty]);

  const _columns = useMemo(
    () => [
      {
        accessorKey: 'order_num',
        header: () => <div>#</div>,
        cell: ({ row }) => <div>{row.index + 1}</div>,
        meta: {
          className: 'border-r w-4',
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
    <div className="rounded-md border flex flex-col overflow-auto max-h-[calc(100dvh-120px)]">
      <Table className="flex-[1_0_0]">
        <TableHeader className="sticky top-0 z-[2] bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </DraggableItem>
              ) : (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={(cell.column.columnDef.meta as { className?: string })?.className}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
