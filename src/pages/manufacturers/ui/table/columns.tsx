import type { ManufacturerTableMeta } from './types';
import type { Manufacturer } from '@/shared/api/manufacturer/types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const manufacturer_columns: ColumnDef<Manufacturer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
  },

  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as ManufacturerTableMeta;

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
