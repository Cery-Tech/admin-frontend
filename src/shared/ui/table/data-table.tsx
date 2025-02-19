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
  ...props
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableExpanding: true,
    enableSorting: true,
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
    <div className="rounded-md border flex flex-col overflow-auto">
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
                    <TableCell key={cell.id}>
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
