import type { ModelTableItem, ModelTableMeta } from './types';
import type { ColumnDef } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const model_columns: ColumnDef<ModelTableItem>[] = [
  {
    accessorKey: 'manufacturer_name',
    header: 'Make',
    meta: {
      headerClassName: 'w-1/6',
    },
  },
  {
    accessorKey: 'name',
    header: 'Model',
  },
  {
    accessorKey: 'years_range',
    header: 'Years',
    filterFn: (row, _, filterValue) => {
      const val = String(filterValue);

      if (filterValue.startsWith('!') && filterValue.length > 1) {
        const value = val.slice(1);

        return row.original.available_years.includes(Number(value));
      }

      if (filterValue.startsWith('%') && filterValue.length > 1) {
        const value = val.slice(1);

        return row.original.available_years.some((num) => num.toString().includes(value));
      }

      if (val.length < 4) return true;

      if (!Number(val)) {
        return row.original.years_range.includes(val);
      }

      const result = row.original.available_years.includes(Number(val));

      return result;
    },
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
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
