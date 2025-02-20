'use client';

import type { EquipmentType } from '@/shared/api/equipment-type/types';

import { useGetEquipmentTypes } from '@/shared/api/equipment-type/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreateEquipmentTypeDialog } from './forms';
import { EditEquipmentTypeDialog } from './forms/EditEquipmentTypeDialog';
import { EquipmentTypeTable } from './table';

export const EquipmentTypePage = () => {
  const { data: { type: list = [] } = {} } = useGetEquipmentTypes();
  const editDialog = useDialogState<EquipmentType>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <EquipmentTypeTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreateEquipmentTypeDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditEquipmentTypeDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
