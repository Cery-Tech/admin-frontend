import type { IndustryFormPack } from '../../model/form';

import { FormField } from '@/components/ui/form';

import { TextField } from '@/shared/ui/controlled-fields/input';

type Props = {
  formPack: IndustryFormPack;
};

export const IndustryForm = ({ formPack }: Props) => {
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
          render={({ field }) => (
            <TextField
              {...field}
              label="Rate"
              min="0"
              step="1"
              type="number"
              onChange={(e) => field.onChange(Math.abs(Number(e.target.value)))}
            />
          )}
        />
      </div>
    </div>
  );
};
