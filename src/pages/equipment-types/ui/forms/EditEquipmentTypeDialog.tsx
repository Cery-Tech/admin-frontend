import type { EquipmentTypeFormValues } from '../../model/form';
import type { EquipmentType } from '@/shared/api/equipment-type/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdateEquipmentType } from '@/shared/api/equipment-type/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useEquipmentTypeForm } from '../../model/form';
import { EquipmentTypeForm } from './EquipmentTypeForm';

type Props = {
  values: EquipmentType | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditEquipmentTypeDialog = memo(function EditEquipmentTypeDialog(props: Props) {
  const { mutate, isPending } = useUpdateEquipmentType();
  const form = useEquipmentTypeForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
          rate: 0,
          industry_id: 0,
          category_id: 0,
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

  const updateReq = (values: EquipmentTypeFormValues) => {
    if (!props.values) return;

    const item: EquipmentType = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('EquipmentType updated');
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
      title={`Edit ${props.values?.name ?? 'Equipment Type'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <EquipmentTypeForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
