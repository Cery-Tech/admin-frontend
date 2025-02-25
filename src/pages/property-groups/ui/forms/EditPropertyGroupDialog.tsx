import type { PropertyGroupFormValues } from '../../model/form';
import type { PropertyGroup } from '@/shared/api/property-group/types';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { memo } from 'react';

import { Form } from '@/components/ui/form';

import { useUpdatePropertyGroup } from '@/shared/api/property-group/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { AppDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { usePropertyGroupForm } from '../../model/form';
import { PropertyGroupForm } from './PropertyGroupForm';

type Props = {
  values: PropertyGroup | null;
  existGroups?: string[];
} & OpenCloseProps;

export const EditPropertyGroupDialog = memo(function EditPropertyGroupDialog(props: Props) {
  const { mutate, isPending } = useUpdatePropertyGroup();
  const form = usePropertyGroupForm({
    values: props.values
      ? {
          ...props.values,
        }
      : {
          name: '',
          rate: 0,
        },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const closeDialog = () => {
    form.reset();
    props.onClose();
  };

  const updateReq = (values: PropertyGroupFormValues) => {
    if (!props.values) return;

    const item: PropertyGroup = {
      ...props.values,
      ...values,
    };

    mutate(item, {
      onSuccess: () => {
        showSuccessMessage('PropertyGroup updated');
        closeDialog();
      },
      onError: (err) => showErrorMessage(err),
    });
  };

  return (
    <AppDialog
      isOpen={props.isOpen}
      processing={isPending}
      slotProps={{
        base: {
          size: '4xl',
        },
      }}
      title={`Edit ${props.values?.name ?? 'PropertyGroup'}`}
      onClose={closeDialog}
      onRightBtnClick={form.handleSubmit(updateReq)}
    >
      <form className="py-2">
        <Form {...form}>
          <PropertyGroupForm formPack={formPack} />
        </Form>
      </form>
    </AppDialog>
  );
});
