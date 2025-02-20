import type { ModelTypeTableMeta } from './types';
import type { ModelType } from '@/shared/api/model-types/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogBody, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useDeleteModelType } from '@/shared/api/model-types/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { BaseDialog } from '@/shared/ui/dialog/BaseDialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { admin_properties_columns } from './columns';

type Props = {
  list: ModelType[];
  dialog: UseDialogStateReturn<ModelType>;
  createDialog: UseDialogReturn;
};

export const ModelTypesTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeleteModelType();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (property: ModelType) => {
      if (!property.type_id) {
        return;
      }

      deleteRequest(
        {
          manufacturer_id: property.manufacturer_id,
          model_id: property.model_id,
          type_id: property.type_id,
        },
        {
          onSuccess: () => {
            showSuccessMessage('Property deleted successfully');
          },
          onError: (error) => {
            showErrorMessage(error);
          },
          onSettled: () => {
            confirmDialog.finishProcessing();
            confirmDialog.close();
          },
        }
      );
      confirmDialog.startProcessing();
    },
    [deleteRequest, confirmDialog]
  );

  const tableRows = list;

  const tableMeta = useMemo(() => {
    const meta: ModelTypeTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: ModelType) => {
        confirmDialog.open({
          title: 'Delete property',
          children: <p>Are you sure you want to delete this property?</p>,
          onConfirm: () => {
            deleteProperty(row);
          },
        });
      },
    };

    return meta;
  }, [dialog, deleteProperty, confirmDialog]);

  const filteredProperties = useMemo(() => {
    if (!search) {
      return tableRows;
    }

    return matchSorter(tableRows, search, {
      keys: ['manufacturere_name', 'model_name', 'type_name'],
      threshold: rankings.CONTAINS,
    });
  }, [search, tableRows]);

  const getRowId = useCallback(
    (row: ModelType) => `${row.type_id}_${row.manufacturer_id}_${row.model_id}`,
    []
  );

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search">Search anything</Label>
          <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button onClick={createDialog.open}>Create Relation</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={admin_properties_columns}
          data={filteredProperties}
          getRowId={getRowId}
          keyProperty="type_id"
          meta={tableMeta}
        />
      </div>
      <BaseDialog isOpen={confirmDialog.isOpen} onClose={confirmDialog.close}>
        <DialogBody>
          <DialogTitle>{confirmDialog.state?.title ?? ''}</DialogTitle>
          {confirmDialog.state?.children}
          <DialogFooter>
            <Button variant="outline" onClick={confirmDialog.close}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDialog.state?.onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogBody>
      </BaseDialog>
    </div>
  );
};
