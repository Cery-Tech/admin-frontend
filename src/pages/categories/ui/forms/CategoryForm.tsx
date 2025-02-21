import type { CategoryFormPack } from '../../model/form';

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useGetIndustries } from '@/shared/api/industry/hooks';
import { Combobox } from '@/shared/ui/combobox';
import { TextField } from '@/shared/ui/controlled-fields/input';

type Props = {
  formPack: CategoryFormPack;
};

export const CategoryForm = ({ formPack }: Props) => {
  const { data: { industry: industries = [] } = {} } = useGetIndustries();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <FormField
          control={formPack.control}
          name="industry_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Combobox
                options={industries.map(({ name, industry_id: id }) => ({
                  value: id.toString(),
                  label: name,
                }))}
                value={field.value.toString()}
                onChange={(value) => field.onChange(Number(value))}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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
