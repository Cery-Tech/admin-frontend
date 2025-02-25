import type { PropertyGroupCreateRequest } from '@/shared/api/property-group/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreatePropertyGroup } from '@/shared/api/property-group/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { usePropertyGroupForm } from '../../model/form';
import { PropertyGroupForm } from './PropertyGroupForm';

type Props = {} & OpenCloseProps;

export const CreatePropertyGroupDialog = memo(function CreatePropertyGroupDialog({
  isOpen,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreatePropertyGroup();

  const form = usePropertyGroupForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: PropertyGroupCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('PropertyGroup created');
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
      rightBtnTitle="Add PropertyGroup"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create PropertyGroup"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <PropertyGroupForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
