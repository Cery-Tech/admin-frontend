import type { AdminPropertyFieldValues } from '../../model/form';
import type { AdminProperty } from '@/shared/api/properties/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { FieldPropertyType } from '@/shared/api/properties/consts';
import { useUpdateAdminPropertyMutation } from '@/shared/api/properties/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useAdminPropertyForm } from '../../model/form';
import { AdminPropertyForm } from './AdminPropertyForm';

type Props = {
  property: AdminProperty | null;
} & OpenCloseProps;

export const EditPropertyDialog = memo(function EditPropertyDialog(props: Props) {
  const { mutate, isPending } = useUpdateAdminPropertyMutation();
  const form = useAdminPropertyForm({
    values: props.property
      ? {
          ...props.property,
          property_parameter:
            props.property.property_parameter?.map((param, index) => ({
              ...param,
              position: index,
              uniqueId: param.parameter_id ?? Math.random(),
            })) ?? [],
          property_variant:
            props.property.property_variant?.map((variant, index) => ({
              ...variant,
              position: index,
              uniqueId: variant.variant_id ?? Math.random(),
            })) ?? [],
        }
      : {
          property_parameter: [],
          property_variant: [],
          group_id: 0,
          kind: FieldPropertyType.TEXT,
          name: '',
          property_type: [],
          rate: 0,
        },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const closeDialog = () => {
    form.reset();
    props.onClose();
  };

  const updateForm = (values: AdminPropertyFieldValues) => {
    const property: AdminProperty = {
      ...values,
      property_parameter: values.property_parameter.map(({ parameter_id, ...rest }) => ({
        ...rest,
        parameter_id: parameter_id && parameter_id < 1 ? undefined : parameter_id,
      })),
      property_variant: values.property_variant.map(({ variant_id, ...rest }) => ({
        ...rest,
        variant_id: variant_id && variant_id < 1 ? undefined : variant_id,
      })),
    };

    mutate(
      { property },
      {
        onSuccess: () => {
          showSuccessMessage('Property updated');
          closeDialog();
        },
        onError: (err) => showErrorMessage(err),
      }
    );
  };

  return (
    <AppDialog
      isOpen={props.isOpen}
      processing={isPending}
      slotProps={{
        base: {
          size: '4xl',
        },
      }}
      title={`Edit ${props.property?.name ?? 'Property'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateForm)}
    >
      <form className="py-2">
        <Form {...form}>
          <AdminPropertyForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
