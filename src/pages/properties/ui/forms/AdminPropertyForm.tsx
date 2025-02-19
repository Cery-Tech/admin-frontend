import type { AdminPropertyFormPack } from '../../model/form';

import { CirclePlusIcon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
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

import { FieldPropertyType } from '@/shared/api/properties/consts';
import { useVehicleTypes } from '@/shared/api/references/hooks';
import { TextField } from '@/shared/ui/controlled-fields/input';
import { MultiSelect } from '@/shared/ui/multiselect';
import { showErrorMessage } from '@/shared/utils/toasts';

import { ParametersDraggableTable } from './ParametersDraggableTable';
import { VariantsDraggableTable } from './VariantsDraggableTable';

type Props = {
  formPack: AdminPropertyFormPack;
  existGroups?: string[];
  actions?: React.ReactNode;
};

export const AdminPropertyForm = ({ formPack, existGroups, actions }: Props) => {
  const [newGroup, setNewGroup] = useState<string | null>(null);

  const group = formPack.watch('group') ?? '';

  const groups = useMemo(() => {
    const groups = new Set(existGroups);

    if (group) {
      groups.add(group);
    }

    return groups;
  }, [existGroups, group]);

  const { data: { types = [] } = {} } = useVehicleTypes();

  const vehicleTypes = useMemo(() => {
    return types.map((type) => ({ ...type, number: 0 }));
  }, [types]);

  const saveGroup = () => {
    if (!newGroup) {
      setNewGroup(null);
      showErrorMessage('Group name is required');

      return;
    }

    formPack.setValue('group', newGroup);
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
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <div className="flex gap-2 items-end">
                {newGroup === null ? (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger ref={field.ref} className="flex-1" onBlur={field.onBlur}>
                      <SelectValue>{field.value ? field.value : null}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(groups).map((group) =>
                        group ? (
                          <SelectItem key={group} value={group}>
                            <div className="flex items-center justify-between">
                              {group}
                              {!existGroups?.includes(group) ? (
                                <Button
                                  className="w-6 h-6"
                                  size="icon"
                                  variant="destructive"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    formPack.setValue('group', '');
                                  }}
                                >
                                  <TrashIcon />
                                </Button>
                              ) : (
                                ''
                              )}
                            </div>
                          </SelectItem>
                        ) : null
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <>
                    <Input
                      className="flex-1"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                    />

                    <Button size="icon" onClick={saveGroup}>
                      <SaveIcon />
                    </Button>
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
                value: type.id.toString(),
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
