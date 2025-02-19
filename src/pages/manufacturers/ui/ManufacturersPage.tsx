'use client';

import type { Manufacturer } from '@/shared/api/manufacturer/types';

import { useGetManufacturers } from '@/shared/api/manufacturer/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreateManufacturerDialog } from './forms';
import { EditManufacturerDialog } from './forms/EditManufacturerDialog';
import { ManufacturerTable } from './table';

export const ManufacturerPage = () => {
  const { data: { model: list = [] } = {} } = useGetManufacturers();
  const editDialog = useDialogState<Manufacturer>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <ManufacturerTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreateManufacturerDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditManufacturerDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
