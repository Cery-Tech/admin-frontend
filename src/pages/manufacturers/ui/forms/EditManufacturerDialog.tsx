import type { ManufacturerFormValues } from '../../model/form';
import type { Manufacturer } from '@/shared/api/manufacturer/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdateManufacturer } from '@/shared/api/manufacturer/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useManufacturerForm } from '../../model/form';
import { ManufacturerForm } from './ManufacturerForm';

type Props = {
  values: Manufacturer | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditManufacturerDialog = memo(function EditManufacturerDialog(props: Props) {
  const { mutate, isPending } = useUpdateManufacturer();
  const form = useManufacturerForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
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

  const updateReq = (values: ManufacturerFormValues) => {
    if (!props.values) return;

    const item: Manufacturer = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('Manufacturer updated');
        closeDialog();
      },
      onError: (err) => showErrorMessage(err),
    });
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
      title={`Edit ${props.values?.name ?? 'Manufacturer'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <ManufacturerForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
