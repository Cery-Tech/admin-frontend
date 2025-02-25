import type { PropertyVariant } from '@/shared/api/properties/types';
import type { WithDragProps } from '@/shared/ui/drag-and-drop';

import { CirclePlusIcon, EditIcon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';

import { TextField } from '@/shared/ui/controlled-fields/input';
import { changeDragItemOrder } from '@/shared/ui/drag-and-drop';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage } from '@/shared/utils/toasts';

type Props = {
  value: WithDragProps<PropertyVariant>[];
  onChange: (value: WithDragProps<PropertyVariant>[]) => void;
  isAvailable?: boolean;
};

export const VariantsDraggableTable = ({ value, onChange, isAvailable }: Props) => {
  const [variant, setVariant] = useState<PropertyVariant | null>(null);

  const saveVariant = () => {
    if (!variant?.value) {
      showErrorMessage('Value is required');

      return;
    }

    const items = value;

    const newValue = items.find((item) => item.variant_id === variant.variant_id)
      ? items.map((item) =>
          item.variant_id === variant.variant_id
            ? {
                ...item,
                value: variant.value,
              }
            : item
        )
      : [
          ...items,
          {
            ...variant,
            position: items.length,
            uniqueId: variant.variant_id?.toString() ?? Math.random().toString(),
          },
        ];

    onChange(newValue);
    setVariant(null);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <FormLabel>Variants</FormLabel>

      <div className="max-h-[calc(100dvh_-_150px)] overflow-auto">
        <DataTable
          dragEnabled
          columns={[
            {
              accessorKey: 'position',
              header: 'Position',
              cell: ({ row }) => <span>{row.original.position + 1}</span>,
            },
            {
              accessorKey: 'value',
              header: 'Value',
            },
            {
              accessorKey: 'actions',
              enableColumnFilter: false,
              header: () => '',
              cell: ({ row }) => (
                <div className="flex gap-2 justify-end">
                  <Button size="icon" variant="outline" onClick={() => setVariant(row.original)}>
                    <EditIcon />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      onChange(value.filter((item) => item.variant_id !== row.original.variant_id))
                    }
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ),
            },
          ]}
          data={[...value].sort((a, b) => a.position - b.position)}
          dragGroupName="variants"
          enableColumnFilters={false}
          getDragIndex={(row) =>
            value.find((item) => item.variant_id === row.variant_id)?.position ?? 0
          }
          getUniqueRowId={(row) => row.uniqueId}
          keyProperty="uniqueId"
          onReorder={(prev, next) =>
            onChange(
              changeDragItemOrder(
                value,
                prev,
                next,
                (item) => item.uniqueId,
                (item, index) => ({
                  ...item,
                  position: index,
                })
              )
            )
          }
        />
      </div>
      <div className="flex gap-4 w-full items-end">
        {isAvailable ? (
          variant === null ? (
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setVariant({ value: '', variant_id: Math.random() })}
            >
              <PlusIcon /> Add new
            </Button>
          ) : (
            <>
              <TextField
                className="w-full"
                label="Value"
                value={variant.value}
                wrapperProps={{ className: 'flex-1' }}
                onChange={(e) => setVariant((prev) => ({ ...prev, value: e.target.value }))}
              />
              <Button size="icon" variant="destructive" onClick={() => setVariant(null)}>
                <CirclePlusIcon className="rotate-45" />
              </Button>

              <Button size="icon" onClick={saveVariant}>
                <SaveIcon />
              </Button>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};
