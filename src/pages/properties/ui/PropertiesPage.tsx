'use client';

import type { AdminProperty } from '@/shared/api/properties/types';

import { useGetAdminPropertiesFields } from '@/shared/api/properties/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreatePropertyDialog, EditPropertyDialog } from './forms';
import { AdminPropertiesTable } from './table';

export const PropertiesPage = () => {
  const { data: { property = [] } = {} } = useGetAdminPropertiesFields();
  const editDialog = useDialogState<AdminProperty>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <AdminPropertiesTable
          createDialog={createDialog}
          dialog={editDialog}
          properties={property}
        />
        <CreatePropertyDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditPropertyDialog
          isOpen={editDialog.isOpen}
          property={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
