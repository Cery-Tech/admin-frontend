import type { ModelTypeCreateRequest } from '@/shared/api/model-types/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateModelType } from '@/shared/api/model-types/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useModelTypeForm } from '../../model/form';
import { ModelTypeForm } from './ModelTypeForm';

type Props = {} & OpenCloseProps;

export const CreatePropertyDialog = memo(function CreatePropertyForm({ isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateModelType();

  const form = useModelTypeForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createProperty = (values: ModelTypeCreateRequest) => {
    mutate(
      {
        manufacturer_id: values.manufacturer_id,
        model_id: values.model_id,
        type_id: values.type_id,
      },
      {
        onSuccess: () => {
          showSuccessMessage('Relation created');
          closeDialog();
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
      processing={isPending}
      rightBtnTitle="Add Field"
      slotProps={{
        base: {
          size: 'lg',
        },
      }}
      title="Create Field"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createProperty)}
    >
      <form className="py-2">
        <Form {...form}>
          <ModelTypeForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
