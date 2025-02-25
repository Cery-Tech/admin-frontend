import type { ManufacturerFormPack } from '../../model/form';

import { FormField } from '@/components/ui/form';

import { NumberField, TextField } from '@/shared/ui/controlled-fields/input';

type Props = {
  formPack: ManufacturerFormPack;
};

export const ManufacturerForm = ({ formPack }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <FormField
          control={formPack.control}
          name="name"
          render={({ field }) => <TextField {...field} label="Name" />}
        />

        <FormField
          control={formPack.control}
          name="rate"
          render={({ field: { onChange, ...field } }) => (
            <NumberField
              {...field}
              label="Rate"
              min="0"
              step="1"
              value={field.value || ''}
              onValueChange={(e) => onChange(Math.abs(Number(e.floatValue ?? 0)))}
            />
          )}
        />
      </div>
    </div>
  );
};
