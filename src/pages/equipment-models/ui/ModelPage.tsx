'use client';

import type { Model } from '@/shared/api/model/types';

import { useGetModels } from '@/shared/api/model/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreateModelDialog } from './forms';
import { EditModelDialog } from './forms/EditModelDialog';
import { ModelTable } from './table';

export const ModelPage = () => {
  const { data: { model: list = [] } = {} } = useGetModels();
  const editDialog = useDialogState<Model>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <ModelTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreateModelDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditModelDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
