import type { EquipmentTypeTableItem, EquipmentTypeTableMeta } from './types';
import type { EquipmentType } from '@/shared/api/equipment-type/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useGetCategories } from '@/shared/api/category/hooks';
import { useDeleteEquipmentType } from '@/shared/api/equipment-type/hooks';
import { useGetIndustries } from '@/shared/api/industry/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { AppDialog } from '@/shared/ui/dialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { equipment_type_columns } from './columns';

type Props = {
  list: EquipmentType[];
  dialog: UseDialogStateReturn<EquipmentType>;
  createDialog: UseDialogReturn;
};

export const EquipmentTypeTable = ({ list, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const { mutate: deleteRequest } = useDeleteEquipmentType();
  const { data } = useGetIndustries();
  const { data: categoryData } = useGetCategories();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const deleteProperty = useCallback(
    (item: EquipmentType) => {
      if (!item.type_id) {
        return;
      }

      deleteRequest(
        { type_id: item.type_id, industry_id: item.industry_id, category_id: item.category_id },
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

  const tableRows: EquipmentTypeTableItem[] = useMemo(() => {
    const industriesMap = new Map(data?.industry.map((i) => [i.industry_id, i.name]));
    const categoriesMap = new Map(categoryData?.category.map((i) => [i.category_id, i.name]));

    return list.map((item) => ({
      ...item,
      industry_name: industriesMap.get(item.industry_id) ?? '',
      category_name: categoriesMap.get(item.category_id) ?? '',
    }));
  }, [list, data, categoryData]);

  const tableMeta = useMemo(() => {
    const meta: EquipmentTypeTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: EquipmentType) => {
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
      keys: ['name', 'industry_name', 'category_name'],
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
        <Button onClick={createDialog.open}>Create Equipment Type</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={equipment_type_columns}
          data={filteredProperties}
          keyProperty="type_id"
          meta={tableMeta}
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
