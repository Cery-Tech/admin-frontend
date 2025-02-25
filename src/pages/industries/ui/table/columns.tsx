import type { IndustryTableMeta } from './types';
import type { Industry } from '@/shared/api/industry/types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const industry_columns: ColumnDef<Industry>[] = [
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
  },

  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as IndustryTableMeta;

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
