import type { ManufacturerTableMeta } from './types';
import type { Manufacturer } from '@/shared/api/manufacturer/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useDeleteManufacturer } from '@/shared/api/manufacturer/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { createTableFilter } from '@/shared/model/stores';
import { AppDialog } from '@/shared/ui/dialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { manufacturer_columns } from './columns';

type Props = {
  list: Manufacturer[];
  dialog: UseDialogStateReturn<Manufacturer>;
  createDialog: UseDialogReturn;
};

const { useFilter } = createTableFilter();

export const ManufacturerTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeleteManufacturer();

  const filter = useFilter();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (item: Manufacturer) => {
      if (!item.manufacturer_id) {
        return;
      }

      deleteRequest(
        { manufacturer_id: item.manufacturer_id },
        {
          onSuccess: () => {
            showSuccessMessage('Deleted successfully');
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
    const meta: ManufacturerTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: Manufacturer) => {
        confirmDialog.open({
          title: 'Delete entity',
          children: <p>Are you sure you want to delete this item?</p>,
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
      keys: ['name'],
      threshold: rankings.CONTAINS,
    });
  }, [search, tableRows]);

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search">Search anything</Label>
          <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button onClick={createDialog.open}>Create Manufacturer</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={manufacturer_columns}
          data={filteredProperties}
          keyProperty="manufacturer_id"
          meta={tableMeta}
          {...filter}
        />
      </div>
      <AppDialog
        isOpen={confirmDialog.isOpen}
        processing={confirmDialog.processing}
        slotProps={{
          rightBtn: {
            variant: 'destructive',
          },
        }}
        title={confirmDialog?.state?.title}
        onClose={confirmDialog.close}
        onRightBtnClick={confirmDialog.state?.onConfirm}
      >
        {confirmDialog.state?.children}
      </AppDialog>
    </div>
  );
};
