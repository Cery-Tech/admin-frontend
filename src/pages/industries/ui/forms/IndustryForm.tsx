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
      </div>
    </div>
  );
};
