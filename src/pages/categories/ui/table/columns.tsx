import type { CategoryTableItem, CategoryTableMeta } from './types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const category_columns: ColumnDef<CategoryTableItem>[] = [
  {
    accessorKey: 'industry_name',
    header: () => <div>Industry</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
  },
  {
    accessorKey: 'rate',
    header: () => <div>Rate</div>,
  },

  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as CategoryTableMeta;

      return (
        <div className="flex items-start gap-2 justify-end">
          <Button size="icon" variant="outline" onClick={() => meta?.onEdit?.(row.original)}>
            <EditIcon />
          </Button>

          <Button size="icon" variant="destructive" onClick={() => meta?.onDelete?.(row.original)}>
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
