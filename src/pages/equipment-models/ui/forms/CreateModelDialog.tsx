import type { ModelCreateRequest } from '@/shared/api/model/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateModel } from '@/shared/api/model/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useModelForm } from '../../model/form';
import { ModelForm } from './ModelForm';

type Props = {} & OpenCloseProps;

export const CreateModelDialog = memo(function CreateModelDialog({ isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateModel();

  const form = useModelForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: ModelCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('Model created');
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
      rightBtnTitle="Add Model"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create Model"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <ModelForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
