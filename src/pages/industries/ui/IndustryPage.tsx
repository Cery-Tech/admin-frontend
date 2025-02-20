'use client';

import type { Industry } from '@/shared/api/industry/types';

import { useGetIndustries } from '@/shared/api/industry/hooks';
import useDialogState, { useDialog } from '@/shared/hooks/useDialog';

import { CreateIndustryDialog } from './forms';
import { EditIndustryDialog } from './forms/EditIndustryDialog';
import { IndustryTable } from './table';

export const IndustryPage = () => {
  const { data: { industry: list = [] } = {} } = useGetIndustries();
  const editDialog = useDialogState<Industry>();

  const createDialog = useDialog();

  return (
    <div className="bg-default-50 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <IndustryTable createDialog={createDialog} dialog={editDialog} list={list} />
        <CreateIndustryDialog isOpen={createDialog.isOpen} onClose={createDialog.close} />
        <EditIndustryDialog
          isOpen={editDialog.isOpen}
          values={editDialog.state}
          onClose={editDialog.close}
        />
      </div>
    </div>
  );
};
