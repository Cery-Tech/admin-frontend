import type { CategoryCreateRequest } from '@/shared/api/category/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useCreateCategory } from '@/shared/api/category/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useCategoryForm } from '../../model/form';
import { CategoryForm } from './CategoryForm';

type Props = {} & OpenCloseProps;

export const CreateCategoryDialog = memo(function CreateCategoryDialog({ isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateCategory();

  const form = useCategoryForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const createReq = (values: CategoryCreateRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessMessage('Category created');
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
      rightBtnTitle="Add Category"
      slotProps={{
        base: {
          size: 'md',
        },
      }}
      title="Create Category"
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(createReq, console.debug)}
    >
      <form className="py-2">
        <Form {...form}>
          <CategoryForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
