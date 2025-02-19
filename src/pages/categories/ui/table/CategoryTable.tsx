import type { CategoryTableItem, CategoryTableMeta } from './types';
import type { Category } from '@/shared/api/category/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogBody, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useDeleteCategory } from '@/shared/api/category/hooks';
import { useGetIndustries } from '@/shared/api/industry/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { BaseDialog } from '@/shared/ui/dialog/BaseDialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { category_columns } from './columns';

type Props = {
  list: Category[];
  dialog: UseDialogStateReturn<Category>;
  createDialog: UseDialogReturn;
};

export const CategoryTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeleteCategory();
  const { data } = useGetIndustries();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (item: Category) => {
      if (!item.category_id) {
        return;
      }

      deleteRequest(
        { category_id: item.category_id, industry_id: item.industry_id },
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

  const tableRows: CategoryTableItem[] = useMemo(() => {
    const industriesMap = new Map(data?.model.map((i) => [i.industry_id, i.name]));

    return list.map((item) => ({
      ...item,
      industry_name: industriesMap.get(item.industry_id) ?? '',
    }));
  }, [list, data]);

  const tableMeta = useMemo(() => {
    const meta: CategoryTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: Category) => {
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
      keys: ['name', 'industry_name'],
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
        <Button onClick={createDialog.open}>Create Category</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={category_columns}
          data={filteredProperties}
          keyProperty="category_id"
          meta={tableMeta}
        />
      </div>
      <BaseDialog className="pb-4" isOpen={confirmDialog.isOpen} onClose={confirmDialog.close}>
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
