import type { ModelFormValues } from '../../model/form';
import type { Model } from '@/shared/api/model/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdateModel } from '@/shared/api/model/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useModelForm } from '../../model/form';
import { ModelForm } from './ModelForm';

type Props = {
  values: Model | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditModelDialog = memo(function EditModelDialog(props: Props) {
  const { mutate, isPending } = useUpdateModel();
  const form = useModelForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
          manufacturer_id: 0,
          avaible_years: [],
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

  const updateReq = (values: ModelFormValues) => {
    if (!props.values) return;

    const item: Model = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('Model updated');
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
      title={`Edit ${props.values?.name ?? 'Model'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <ModelForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
