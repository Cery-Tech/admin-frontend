import type { ManufacturerCreateRequest } from '@/shared/api/manufacturer/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateManufacturer } from '@/shared/api/manufacturer/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useManufacturerForm } from '../../model/form';
import { ManufacturerForm } from './ManufacturerForm';

type Props = {} & OpenCloseProps;

export const CreateManufacturerDialog = memo(function CreateManufacturerDialog({
  isOpen,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreateManufacturer();

  const form = useManufacturerForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: ManufacturerCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('Manufacturer created');
        closeDialog();
      },
      onError: (err) => {
        showErrorMessage(err);
      },
    });
  };

  const closeDialog = () => {
    form.reset();
    onClose();
  };

  return (
    <AppDialog
      isOpen={isOpen}
      processing={isPending}
      rightBtnTitle="Add Manufacturer"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create Manufacturer"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <ManufacturerForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
