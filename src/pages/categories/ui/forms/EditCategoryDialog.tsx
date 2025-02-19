import type { CategoryFormValues } from '../../model/form';
import type { Category } from '@/shared/api/category/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdateCategory } from '@/shared/api/category/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { useCategoryForm } from '../../model/form';
import { CategoryForm } from './CategoryForm';

type Props = {
  values: Category | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditCategoryDialog = memo(function EditCategoryDialog(props: Props) {
  const { mutate, isPending } = useUpdateCategory();
  const form = useCategoryForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
          rate: 0,
          industry_id: 0,
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

  const updateReq = (values: CategoryFormValues) => {
    if (!props.values) return;

    const item: Category = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('Category updated');
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
      title={`Edit ${props.values?.name ?? 'Category'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <CategoryForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
