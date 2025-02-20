import type { ModelTableItem, ModelTableMeta } from './types';
import type { Model } from '@/shared/api/model/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogBody, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useGetManufacturers } from '@/shared/api/manufacturer/hooks';
import { useDeleteModel } from '@/shared/api/model/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { BaseDialog } from '@/shared/ui/dialog/BaseDialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { modelYearsString } from '../../utils/years';
import { model_columns } from './columns';

type Props = {
  list: Model[];
  dialog: UseDialogStateReturn<Model>;
  createDialog: UseDialogReturn;
};

export const ModelTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeleteModel();
  const { data } = useGetManufacturers();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (item: Model) => {
      if (!item.model_id) {
        return;
      }

      deleteRequest(
        { model_id: item.model_id, manufacturer_id: item.manufacturer_id },
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

  const makesMap = useMemo(() => {
    return data?.model.reduce(
      (acc, item) => {
        acc[item.manufacturer_id] = item.name;

        return acc;
      },
      {} as Record<number, string>
    );
  }, [data]);

  const tableRows: ModelTableItem[] = useMemo(() => {
    return list.map((model) => ({
      ...model,
      manufacturer_name: makesMap?.[model.manufacturer_id] ?? '',
      years_range: modelYearsString.create(model.avaible_years),
    }));
  }, [list, makesMap]);

  const tableMeta = useMemo(() => {
    const meta: ModelTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: Model) => {
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
      keys: ['name', 'manufacturer_name', 'years_range', 'avaible_years'],
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
        <Button onClick={createDialog.open}>Create Model</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={model_columns}
          data={filteredProperties}
          keyProperty="model_id"
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
