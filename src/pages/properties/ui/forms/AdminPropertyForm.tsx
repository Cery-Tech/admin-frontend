import type { AdminPropertyFormPack } from '../../model/form';

import { CirclePlusIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGetEquipmentTypes } from '@/shared/api/equipment-type/hooks';
import { FieldPropertyType } from '@/shared/api/properties/consts';
import { useCreatePropertyGroup, useGetPropertyGroup } from '@/shared/api/property-group/hooks';
import { LoaderButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/controlled-fields/input';
import { MultiSelect } from '@/shared/ui/multiselect';
import { showErrorMessage } from '@/shared/utils/toasts';

import { ParametersDraggableTable } from './ParametersDraggableTable';
import { VariantsDraggableTable } from './VariantsDraggableTable';

type Props = {
  formPack: AdminPropertyFormPack;
  actions?: React.ReactNode;
};

export const AdminPropertyForm = ({ formPack, actions }: Props) => {
  const [newGroup, setNewGroup] = useState<string | null>(null);

  const { data: { property_group, propertyMap } = {} } = useGetPropertyGroup();

  const { mutateAsync: createPropertyGroup, isPending } = useCreatePropertyGroup();

  const { data: { type: types = [] } = {} } = useGetEquipmentTypes();

  const vehicleTypes = useMemo(() => {
    return types.map((type) => ({ ...type, number: 0 }));
  }, [types]);

  const saveGroup = async () => {
    if (!newGroup) {
      setNewGroup(null);
      showErrorMessage('Group name is required');

      return;
    }

    const { property_group } = await createPropertyGroup({ name: newGroup, rate: 0 });

    formPack.setValue('group_id', property_group.group_id);
    setNewGroup(null);
  };

  const propertyKind = useWatch({ control: formPack.control, name: 'kind' });

  const parameterAvailable = propertyKind === FieldPropertyType.NUMBER;
  const variantAvailable = propertyKind === FieldPropertyType.SELECT;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4">
        <FormField
          control={formPack.control}
          name="name"
          render={({ field }) => <TextField {...field} label="Name" />}
        />
        <Controller
          control={formPack.control}
          name="group_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <div className="flex gap-2 items-end">
                {newGroup === null ? (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val) || 0)}
                  >
                    <SelectTrigger ref={field.ref} className="flex-1" onBlur={field.onBlur}>
                      <SelectValue>
                        {field.value ? propertyMap?.[field.value]?.name : null}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {property_group?.map((group) => (
                        <SelectItem key={group.group_id} value={group.group_id.toString()}>
                          <div className="flex items-center justify-between">{group.name}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <>
                    <Input
                      className="flex-1"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                    />

                    <LoaderButton loading={isPending} size="icon" onClick={saveGroup}>
                      <SaveIcon />
                    </LoaderButton>
                  </>
                )}
                {newGroup === null ? (
                  <Button size="icon" variant="outline" onClick={() => setNewGroup('')}>
                    <PlusIcon />
                  </Button>
                ) : (
                  <Button size="icon" variant="destructive" onClick={() => setNewGroup(null)}>
                    <CirclePlusIcon className="rotate-45" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
        <Controller
          control={formPack.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kind</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                  <SelectValue placeholder="Kind" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    FieldPropertyType.TEXT,
                    FieldPropertyType.BOOL,
                    FieldPropertyType.NUMBER,
                    FieldPropertyType.SELECT,
                  ].map((item) =>
                    item ? (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ) : null
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <Controller
        control={formPack.control}
        name="property_type"
        render={({ field }) => (
          <FormItem style={{ gridColumn: '1/-1' }}>
            <FormLabel>Vehicle types</FormLabel>
            <MultiSelect
              modalPopover
              animation={2}
              defaultValue={field.value?.map((id) => id.toString())}
              maxCount={3}
              options={vehicleTypes.map((type) => ({
                label: type.name,
                value: type.type_id.toString(),
              }))}
              placeholder="Select types"
              variant="inverted"
              onValueChange={(value) => field.onChange(value.map(Number))}
            />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4">
        <Controller
          control={formPack.control}
          name="property_variant"
          render={({ field }) => (
            <VariantsDraggableTable
              isAvailable={variantAvailable}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={formPack.control}
          name="property_parameter"
          render={({ field }) => (
            <ParametersDraggableTable
              isAvailable={parameterAvailable}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      {actions}
    </div>
  );
};
