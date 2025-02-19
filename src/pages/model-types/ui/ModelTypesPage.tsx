'use client';

import type { ModelType } from '@/shared/api/model-types/types';

import { useGetModelTypes } from '@/shared/api/model-types/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreatePropertyDialog } from './forms';
import { ModelTypesTable } from './table';

export const ModelTypesPage = () => {
  const { data: { model_type = [] } = {} } = useGetModelTypes();
  const editDialog = useDialogState<ModelType>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <ModelTypesTable createDialog={createDialog} dialog={editDialog} list={model_type} />
        <CreatePropertyDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
      </div>
    </div>
  );
};
