'use client';

import type { Category } from '@/shared/api/category/types';

import { useGetCategories } from '@/shared/api/category/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreateCategoryDialog } from './forms';
import { EditCategoryDialog } from './forms/EditCategoryDialog';
import { CategoryTable } from './table';

export const CategoryPage = () => {
  const { data: { model: list = [] } = {} } = useGetCategories();
  const editDialog = useDialogState<Category>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <CategoryTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreateCategoryDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditCategoryDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
