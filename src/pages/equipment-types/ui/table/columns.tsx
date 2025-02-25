import type { EquipmentTypeTableItem, EquipmentTypeTableMeta } from './types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const equipment_type_columns: ColumnDef<EquipmentTypeTableItem>[] = [
  {
    accessorKey: 'industry_name',
    header: 'Industry',
  },
  {
    accessorKey: 'category_name',
    header: 'Category',
  },
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
      const meta = table.options?.meta as EquipmentTypeTableMeta;

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
