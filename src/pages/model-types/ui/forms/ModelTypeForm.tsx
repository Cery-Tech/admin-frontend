import type { ModelTypeFormPack } from '../../model/form';

import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useGetEquipmentTypes } from '@/shared/api/equipment-type/hooks';
import { useGetManufacturers } from '@/shared/api/manufacturer/hooks';
import { useGetModels } from '@/shared/api/model/hooks';
import { Combobox } from '@/shared/ui/combobox';

type Props = {
  formPack: ModelTypeFormPack;
};

export const ModelTypeForm = ({ formPack }: Props) => {
  const { data: { type: types = [] } = {} } = useGetEquipmentTypes();
  const { data: { manufacturer: makes = [] } = {} } = useGetManufacturers();
  const { data: { model = [] } = {} } = useGetModels();

  const makeId = useWatch({ control: formPack.control, name: 'manufacturer_id' });

  const models = useMemo(
    () => (makeId ? model.filter((m) => m.manufacturer_id === makeId) : model),
    [makeId, model]
  );

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
          name="model_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Combobox
                options={models.map(({ name, model_id }) => ({
                  value: model_id.toString(),
                  label: name,
                }))}
                value={field.value.toString()}
                onChange={(value) => {
                  field.onChange(Number(value));
                  const modelItem = value
                    ? model.find(({ model_id }) => model_id === Number(value))
                    : null;

                  if (modelItem) {
                    formPack.setValue('manufacturer_id', modelItem.manufacturer_id);
                  }
                }}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formPack.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Combobox
                options={types.map(({ name, type_id: id }) => ({
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
      </div>
    </div>
  );
};
