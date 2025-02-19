import type { IndustryFormPack } from '../../model/form';

import { Controller } from 'react-hook-form';

import { TextField } from '@/shared/ui/controlled-fields/input';

type Props = {
  formPack: IndustryFormPack;
};

export const IndustryForm = ({ formPack }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <Controller
          control={formPack.control}
          name="name"
          render={({ field }) => <TextField {...field} label="Name" />}
        />

        <Controller
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
