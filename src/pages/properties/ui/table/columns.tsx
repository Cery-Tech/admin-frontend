import type { AdminPropertyTableMeta } from './types';
import type { AdminPropertyTableItem } from '@/shared/api/properties/types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, LucideChevronsUpDown, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const admin_properties_columns: ColumnDef<AdminPropertyTableItem>[] = [
  {
    accessorKey: 'property_id',
    header: () => <div>ID</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'kind',
    header: () => <div>Kind</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('kind')}</div>;
    },
  },
  {
    accessorKey: 'group',
    header: () => <div>Group</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('group')}</div>;
    },
  },
  {
    accessorKey: 'rate',
    header: () => <div>Rate</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('rate')}</div>;
    },
  },
  {
    accessorKey: 'typesText',
    header: () => <div>Linked Types</div>,
    cell: ({ row, table }) => {
      const meta = table.options?.meta as AdminPropertyTableMeta;

      return (
        <div
          className={cn(
            'font-medium',
            meta.getRowExpanded?.(row.original.property_id) ? '' : 'max-w-sm max-h-4 truncate'
          )}
        >
          {row.getValue('typesText')}
        </div>
      );
    },
  },
  {
    accessorKey: 'property_variant',
    header: () => <div>Variants</div>,
    cell: ({ row, table }) => {
      const meta = table.options?.meta as AdminPropertyTableMeta;

      return (
        <div
          className={cn(
            'font-medium',
            meta.getRowExpanded?.(row.original.property_id) ? '' : 'max-w-sm max-h-4 truncate'
          )}
        >
          {row
            .getValue<AdminPropertyTableItem['property_variant']>('property_variant')
            ?.map((variant) => variant.value)
            .join(', ')}
        </div>
      );
    },
  },
  {
    accessorKey: 'property_parameter',
    header: () => <div>Parameters</div>,
    cell: ({ row, table }) => {
      const meta = table.options?.meta as AdminPropertyTableMeta;

      return (
        <div
          className={cn(
            'font-medium',
            meta.getRowExpanded?.(row.original.property_id) ? '' : 'max-w-sm max-h-4 truncate'
          )}
        >
          {row
            .getValue<AdminPropertyTableItem['property_parameter']>('property_parameter')
            ?.map((variant) => variant.name)
            .join(', ')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as AdminPropertyTableMeta;

      return (
        <div className="flex items-start gap-2 justify-end">
          <Button size="icon" variant="outline" onClick={() => meta?.onEdit?.(row.original)}>
            <EditIcon />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              meta?.onToggle?.(row.original.property_id);
            }}
          >
            <LucideChevronsUpDown />
          </Button>

          <Button size="icon" variant="destructive" onClick={() => meta?.onDelete?.(row.original)}>
            <TrashIcon />
          </Button>
        </div>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button className="h-8 w-8 p-0" variant="ghost">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem
        //       onClick={(e) => {
        //         e.stopPropagation();
        //         meta?.onToggle?.(row.original.property_id);
        //       }}
        //     >
        //       {meta?.getRowExpanded?.(row.original?.property_id ?? 0) ? 'Collapse' : 'Expand'}
        //     </DropdownMenuItem>
        //     <DropdownMenuItem
        //       onClick={(e) => {
        //         e.stopPropagation();
        //         meta?.onEdit?.(row.original);
        //       }}
        //     >
        //       Edit
        //     </DropdownMenuItem>
        //     <DropdownMenuItem
        //       onClick={(e) => {
        //         e.stopPropagation();
        //         meta?.onDelete?.(row.original);
        //       }}
        //     >
        //       Delete
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];
