import type { AdminPropertyTableMeta } from './types';
import type { EquipmentType } from '@/shared/api/equipment-type/types';
import type { AdminProperty, AdminPropertyTableItem } from '@/shared/api/properties/types';
import type { UseDialogReturn, UseDialogStateReturn } from '@/shared/hooks/useDialog';
import type React from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { matchSorter, rankings } from 'match-sorter';

import { useGetEquipmentTypes } from '@/shared/api/equipment-type/hooks';
import { useDeleteAdminPropertyMutation } from '@/shared/api/properties/hooks';
import { useGetPropertyGroup } from '@/shared/api/property-group/hooks';
import useDialogState from '@/shared/hooks/useDialog';
import { createTableFilter } from '@/shared/model/stores';
import { AppDialog } from '@/shared/ui/dialog';
import { DataTable } from '@/shared/ui/table';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { admin_properties_columns } from './columns';

type Props = {
  properties: AdminProperty[];
  dialog: UseDialogStateReturn<AdminProperty>;
  createDialog: UseDialogReturn;
};

const { useFilter } = createTableFilter();

export const AdminPropertiesTable = ({ properties, dialog, createDialog }: Props) => {
  const [search, setSearch] = useState('');
  const [expandedRowsSet, setExpandedRowsSet] = useState(new Set<number>());
  const { mutate: deleteRequest } = useDeleteAdminPropertyMutation();

  const { data: { propertyMap } = {} } = useGetPropertyGroup();

  const filters = useFilter();

  const confirmDialog = useDialogState<{
    children?: React.ReactNode;
    title: React.ReactNode;
    onConfirm: () => void;
  }>();

  const { data } = useGetEquipmentTypes();

  const toggleRow = useCallback((id?: number) => {
    setExpandedRowsSet((prev) => {
      if (!id) {
        return prev;
      }
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  }, []);

  const deleteProperty = useCallback(
    (property: AdminProperty) => {
      if (!property.property_id) {
        return;
      }

      deleteRequest(
        { property_id: property.property_id },
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

  const tableRows = useMemo(() => {
    const keyMap = data?.type.reduce(
      (acc, type) => {
        acc[type.type_id] = type;

        return acc;
      },
      {} as Record<string, EquipmentType>
    );

    const rows = properties.map((property) => {
      const linked_types = property.property_type
        ?.map((type) => keyMap?.[type.toString()])
        .filter(Boolean) as EquipmentType[];
      const variantsText = property.property_variant?.map((variant) => variant.value).join(', ');
      const propertiesText = property.property_parameter
        ?.map((parameter) => parameter.name)
        .join(', ');

      return {
        ...property,
        linked_types,
        variantsText,
        propertiesText,
        typesText: linked_types?.map((type) => type.name).join(', '),
        group: propertyMap?.[property.group_id ?? 0]?.name,
      } satisfies AdminPropertyTableItem;
    });

    return rows;
  }, [properties, data, propertyMap]);

  const tableMeta = useMemo(() => {
    const meta: AdminPropertyTableMeta = {
      onEdit: dialog.open,
      onDelete: (row: AdminProperty) => {
        confirmDialog.open({
          title: 'Delete property',
          children: <p>Are you sure you want to delete this property?</p>,
          onConfirm: () => {
            deleteProperty(row);
          },
        });
      },
      onToggle: toggleRow,
      getRowExpanded: (id) => (id ? expandedRowsSet.has(id) : false),
    };

    return meta;
  }, [dialog, deleteProperty, confirmDialog, toggleRow, expandedRowsSet]);

  const filteredProperties = useMemo(() => {
    if (!search) {
      return tableRows;
    }

    return matchSorter(tableRows, search, {
      keys: ['property_id', 'name', 'kind', 'group', 'typesText', 'variantsText', 'propertiesText'],
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
        <Button onClick={createDialog.open}>Create Property</Button>
      </div>
      <div className="flex flex-col flex-1">
        <DataTable
          columns={admin_properties_columns}
          data={filteredProperties}
          keyProperty="property_id"
          meta={tableMeta}
          {...filters}
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
