import type { ModelFormPack } from '../../model/form';

import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useGetManufacturers } from '@/shared/api/manufacturer/hooks';
import { Combobox } from '@/shared/ui/combobox';
import { TextField } from '@/shared/ui/controlled-fields/input';

import { modelYearsString } from '../../utils/years';

type Props = {
  formPack: ModelFormPack;
};

export const ModelForm = ({ formPack }: Props) => {
  const { data: { manufacturer: makes = [] } = {} } = useGetManufacturers();
  const [years, setYears] = useState('');

  const yearsValue = useWatch({ control: formPack.control, name: 'avaible_years' });

  useEffect(() => {
    setYears((prev) => (!prev ? modelYearsString.create(yearsValue) : prev));
  }, [yearsValue]);

  useEffect(() => {
    const prevYears = formPack.getValues('avaible_years');
    const newYears = modelYearsString.parse(years);

    if (newYears.length === 0 && prevYears.length === 0) {
      return;
    }

    formPack.setValue('avaible_years', modelYearsString.parse(years));
  }, [years, formPack]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <FormField
          control={formPack.control}
          name="manufacturer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <Combobox
                options={makes.map(({ name, manufacturer_id: id }) => ({
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
          name="avaible_years"
          render={({ field }) => (
            <TextField
              {...field}
              description="Use comma to separate ranges, e.g. 2010 - 2015, 2017"
              label="Years range"
              min="0"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          )}
        />
        <div className="font-normal text-muted-foreground text-sm">
          Will be applied: {yearsValue.join(', ')}
        </div>
      </div>
    </div>
  );
};
