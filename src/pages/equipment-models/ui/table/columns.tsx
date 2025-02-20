import type { ModelTableItem, ModelTableMeta } from './types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const model_columns: ColumnDef<ModelTableItem>[] = [
  {
    accessorKey: 'manufacturer_name',
    header: () => <div>Make</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div>Model</div>,
  },
  {
    accessorKey: 'years_range',
    header: () => <div>Years</div>,
  },
  {
    accessorKey: 'rate',
    header: () => <div>Rate</div>,
  },

  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as ModelTableMeta;

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
