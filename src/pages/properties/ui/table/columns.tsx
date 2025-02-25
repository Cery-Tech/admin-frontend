import type { AdminPropertyTableMeta } from './types';
import type { AdminPropertyTableItem } from '@/shared/api/properties/types';
import type { ColumnDef } from '@tanstack/react-table';

import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { EditIcon, ListFilterPlusIcon, LucideChevronsUpDown, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const admin_properties_columns: ColumnDef<AdminPropertyTableItem>[] = [
  {
    accessorKey: 'property_id',
    header: 'ID',
    meta: {
      className: 'w-16',
      headerClassName: 'w-16',
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'kind',
    header: 'Kind',
    meta: {
      headerClassName: 'w-32',
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('kind')}</div>;
    },
  },
  {
    accessorKey: 'group',
    header: 'Group',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('group')}</div>;
    },
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
    meta: {
      headerClassName: 'w-24',
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('rate')}</div>;
    },
  },
  {
    accessorKey: 'typesText',
    header: 'Linked Types',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as AdminPropertyTableMeta;

      return (
        <div
          className={cn(
            'font-medium',
            meta.getRowExpanded?.(row.original.property_id) ? '' : 'max-w-sm max-h-5 truncate'
          )}
        >
          {row.getValue('typesText')}
        </div>
      );
    },
  },
  {
    accessorKey: 'property_variant',
    header: 'Variants',
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
    header: 'Parameters',
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
    accessorKey: 'is_filterbale',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <ListFilterPlusIcon />
        </TooltipTrigger>
        <TooltipContent>
          <div>Filterable</div>
          <div className="text-xs text-gray-500">Will be in sidebar filter</div>
        </TooltipContent>
      </Tooltip>
    ),
    enableColumnFilter: false,
    meta: {
      headerClassName: 'w-8',
    },
    cell: ({ row }) => {
      return row.original.is_filterable && <div className="font-medium">✔</div>;
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
