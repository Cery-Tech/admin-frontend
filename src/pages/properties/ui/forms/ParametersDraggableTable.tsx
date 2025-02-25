import type { PropertyPrarmeter } from '@/shared/api/properties/types';
import type { WithDragProps } from '@/shared/ui/drag-and-drop';

import { CirclePlusIcon, EditIcon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';

import { NumberField, TextField } from '@/shared/ui/controlled-fields/input';
import { changeDragItemOrder } from '@/shared/ui/drag-and-drop';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage } from '@/shared/utils/toasts';

type Props = {
  value: WithDragProps<PropertyPrarmeter>[];
  onChange: (parameters: PropertyPrarmeter[]) => void;
  isAvailable?: boolean;
};

export const ParametersDraggableTable = ({ value, onChange, isAvailable }: Props) => {
  const [parameter, setParameter] = useState<PropertyPrarmeter | null>(null);

  const saveParameter = () => {
    if (!(parameter?.name && parameter.multiplier)) {
      showErrorMessage('Name and multiplier are required');

      return;
    }

    const parameters = value;
    const newValue = parameters.find((param) => param.parameter_id === parameter.parameter_id)
      ? parameters.map((param) =>
          param.parameter_id === parameter.parameter_id
            ? {
                ...param,
                name: parameter.name,
                multiplier: parameter.multiplier,
              }
            : param
        )
      : [
          ...parameters,
          {
            ...parameter,
            parameter_id: Math.random(),
            position: parameters.length,
            uniqueId: parameter.parameter_id?.toString() ?? Math.random().toString(),
          },
        ];

    onChange(newValue);
    setParameter(null);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <FormLabel>Parameters</FormLabel>

      <div className="max-h-[250px] overflow-auto">
        <DataTable
          dragEnabled
          columns={[
            {
              accessorKey: 'position',
              header: 'Position',
              meta: {
                headerClassName: 'w-16 text-right',
              },
              cell: ({ row }) => <span>{row.original.position + 1}</span>,
            },
            {
              accessorKey: 'name',
              header: 'Name',
            },

            {
              accessorKey: 'multiplier',
              header: 'Multiplier',
            },
            {
              accessorKey: 'actions',
              header: '',
              cell: ({ row }) => (
                <div className="flex gap-2 justify-end">
                  <Button
                    className="size-7"
                    size="icon"
                    variant="outline"
                    onClick={() => setParameter(row.original)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="size-7"
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      onChange(
                        value.filter((param) => param.parameter_id !== row.original.parameter_id)
                      )
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
            value.find((item) => item.parameter_id === row.parameter_id)?.position ?? 0
          }
          getUniqueRowId={(row) => row.uniqueId}
          headRowClassName="h-8"
          keyProperty="uniqueId"
          rowClassName="h-8"
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
          parameter === null ? (
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setParameter({ name: '', multiplier: 1, parameter_id: Math.random() })}
            >
              <PlusIcon /> Add new
            </Button>
          ) : (
            <>
              <TextField
                className="w-full"
                label="Name"
                value={parameter.name}
                wrapperProps={{ className: 'flex-1' }}
                onChange={(e) => setParameter({ ...parameter, name: e.target.value })}
              />
              <NumberField
                valueIsNumericString
                className="w-full"
                label="Multiplier"
                value={parameter.multiplier || ''}
                wrapperProps={{ className: 'flex-1' }}
                onValueChange={(e) =>
                  setParameter({
                    ...parameter,
                    multiplier: Math.abs(Number(e.floatValue ?? 0)),
                  })
                }
              />
              <Button size="icon" variant="destructive" onClick={() => setParameter(null)}>
                <CirclePlusIcon className="rotate-45" />
              </Button>

              <Button size="icon" onClick={saveParameter}>
                <SaveIcon />
              </Button>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};
