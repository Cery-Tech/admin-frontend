import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { CSSProperties, PropsWithChildren } from 'react';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// needed for row & cell level scope DnD setup
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// needed for table body level scope DnD setup

// Cell Component
export const RowDragHandleCell = ({
  rowId,
  children = '🟰',
}: PropsWithChildren<{ rowId: string }>) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });

  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      {children}
    </button>
  );
};

// Row Component
const DraggableRow = function <Data>({
  row,
  getUniqueId,
}: {
  row: Row<Data>;
  getUniqueId: (row: Data) => UniqueIdentifier;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: getUniqueId(row.original),
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };

  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

type Props<Data> = {
  columns: ColumnDef<Data>[];
  data: Data[];
  onReorder: (data: Data[]) => void;
  getUniqueId: (row: Data) => UniqueIdentifier;
};

export function DraggableTable<Data>({ columns, data, onReorder, getUniqueId }: Props<Data>) {
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(getUniqueId),
    [data, getUniqueId]
  );

  const _columns = useMemo(
    () => [
      {
        accessorKey: 'drag-handle',
        header: 'Move',
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
        size: 60,
      } satisfies ColumnDef<Data>,
      ...columns,
    ],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: _columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => getUniqueId(row).toString(), //required because row indexes will change
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // reorder rows after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      onReorder(arrayMove(data, oldIndex, newIndex)); //this is just a splice util
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    // NOTE: This provider creates div elements, so don't nest inside of <table> elements
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        console.log('drag start', event);
      }}
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} getUniqueId={getUniqueId} row={row} />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
}
