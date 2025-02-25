import type { IndustryFormValues } from '../../model/form';
import type { Industry } from '@/shared/api/industry/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdateIndustry } from '@/shared/api/industry/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useIndustryForm } from '../../model/form';
import { IndustryForm } from './IndustryForm';

type Props = {
  values: Industry | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditIndustryDialog = memo(function EditIndustryDialog(props: Props) {
  const { mutate, isPending } = useUpdateIndustry();
  const form = useIndustryForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
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

  const updateReq = (values: IndustryFormValues) => {
    if (!props.values) return;

    const item: Industry = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('Industry updated');
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
      title={`Edit ${props.values?.name ?? 'Industry'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <IndustryForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
