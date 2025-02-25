import type { ModelTypeTableMeta } from './types';
import type { ModelType } from '@/shared/api/model-types/types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const admin_properties_columns: ColumnDef<ModelType>[] = [
  {
    accessorKey: 'manufacturere_name',
    header: 'Make',
  },
  {
    accessorKey: 'model_name',
    header: 'Model',
  },
  {
    accessorKey: 'type_name',
    header: 'Type',
  },

  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options?.meta as ModelTypeTableMeta;

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
