import type { PropertyGroupTableMeta } from './types';
import type { PropertyGroup } from '@/shared/api/property-group/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useDeletePropertyGroup } from '@/shared/api/property-group/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { createTableFilter } from '@/shared/model/stores';
import { AppDialog } from '@/shared/ui/dialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { property_group_columns } from './columns';

type Props = {
  list: PropertyGroup[];
  dialog: UseDialogStateReturn<PropertyGroup>;
  createDialog: UseDialogReturn;
};

const { useFilter } = createTableFilter();

export const PropertyGroupTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeletePropertyGroup();

  const filter = useFilter();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (item: PropertyGroup) => {
      if (!item.group_id) {
        return;
      }

      deleteRequest(
        { group_id: item.group_id },
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
    const meta: PropertyGroupTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: PropertyGroup) => {
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
        <Button onClick={createDialog.open}>Create PropertyGroup</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={property_group_columns}
          data={filteredProperties}
          keyProperty="group_id"
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
