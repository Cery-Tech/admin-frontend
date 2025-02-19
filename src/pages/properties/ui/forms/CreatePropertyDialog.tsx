import type { AdminPropertyFieldValues } from '../../model/form';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateAdminPropertyMutation } from '@/shared/api/properties/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useAdminPropertyForm } from '../../model/form';
import { AdminPropertyForm } from './AdminPropertyForm';

type Props = {
  existGroups?: string[];
} & OpenCloseProps;

export const CreatePropertyDialog = memo(function CreatePropertyForm({
  existGroups,
  isOpen,
  onClose,
}: Props) {
  const { mutate } = useCreateAdminPropertyMutation();

  const form = useAdminPropertyForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createProperty = (values: AdminPropertyFieldValues) => {
    mutate(
      {
        property: {
          ...values,
          property_variant:
            values.property_variant?.map((variant) => ({
              value: variant.value,
            })) ?? [],
          property_parameter:
            values.property_parameter?.map((param) => ({
              name: param.name,
              multiplier: param.multiplier,
            })) ?? [],
          property_type: values.property_type?.map(Number) ?? [],
        },
      },
      {
        onSuccess: () => {
          showSuccessMessage('Property created');
          form.reset();
        },
        onError: (err) => {
          showErrorMessage(err);
        },
      }
    );
  };

  const closeDialog = () => {
    form.reset();
    onClose();
  };

  return (
    <AppDialog
      isOpen={isOpen}
      rightBtnTitle="Add Field"
      slotProps={{
        base: {
          size: '4xl',
        },
      }}
      title="Create Field"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createProperty)}
    >
      <form className="py-2">
        <Form {...form}>
          <AdminPropertyForm existGroups={existGroups} formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
