'use client';

import type { PropertyGroup } from '@/shared/api/property-group/types';

import { useGetPropertyGroup } from '@/shared/api/property-group/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreatePropertyGroupDialog } from './forms';
import { EditPropertyGroupDialog } from './forms/EditPropertyGroupDialog';
import { PropertyGroupTable } from './table';

export const PropertyGroupPage = () => {
  const { data: { property_group: list = [] } = {} } = useGetPropertyGroup();
  const editDialog = useDialogState<PropertyGroup>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <PropertyGroupTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreatePropertyGroupDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditPropertyGroupDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
