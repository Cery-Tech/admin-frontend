import type { EquipmentTypeCreateRequest } from '@/shared/api/equipment-type/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateEquipmentType } from '@/shared/api/equipment-type/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useEquipmentTypeForm } from '../../model/form';
import { EquipmentTypeForm } from './EquipmentTypeForm';

type Props = {} & OpenCloseProps;

export const CreateEquipmentTypeDialog = memo(function CreateEquipmentTypeDialog({
  isOpen,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreateEquipmentType();

  const form = useEquipmentTypeForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: EquipmentTypeCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('EquipmentType created');
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
      rightBtnTitle="Add Equipment Type"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create Equipment Type"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <EquipmentTypeForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
