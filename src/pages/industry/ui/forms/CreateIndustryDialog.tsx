import type { IndustryCreateRequest } from '@/shared/api/industry/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateIndustry } from '@/shared/api/industry/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useIndustryForm } from '../../model/form';
import { IndustryForm } from './IndustryForm';

type Props = {} & OpenCloseProps;

export const CreateIndustryDialog = memo(function CreateIndustryDialog({ isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateIndustry();

  const form = useIndustryForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: IndustryCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('Industry created');
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
      rightBtnTitle="Add Industry"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create Industry"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <IndustryForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
