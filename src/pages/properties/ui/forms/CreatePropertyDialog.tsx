import type { AdminPropertyFieldValues } from '../../model/form';
import type { OpenCloseProps } from '@/shared/types/ui/dialog';

import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { DialogBody, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { useCreateAdminPropertyMutation } from '@/shared/api/properties/hooks';
import { useFormPack } from '@/shared/hooks/useFormPack';
import { BaseDialog } from '@/shared/ui/dialog';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils/toasts';

import { adminPropertyFormDefaultValues, useAdminPropertyForm } from '../../model/form';
import { AdminPropertyForm } from './AdminPropertyForm';

type Props = {
  existGroups?: string[];
} & OpenCloseProps;

export const CreatePropertyDialog = memo(function CreatePropertyForm({
  existGroups,
  isOpen,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreateAdminPropertyMutation();

  const form = useAdminPropertyForm({
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const formPack = useFormPack(form);

  const clearMiscellaneous = () => {
    form.reset({
      ...adminPropertyFormDefaultValues,
      property_type: form.getValues('property_type'),
    });
  };

  const createProperty = (onSuccess?: () => void) => (values: AdminPropertyFieldValues) => {
    mutate(
      {
        property: {
          ...values,
          property_variant:
            values.property_variant?.map((variant) => ({
              value: variant.value,
            })) ?? [],
          property_parameter:
            values.property_parameter?.map((param) => ({
              name: param.name,
              multiplier: param.multiplier,
            })) ?? [],
          property_type: values.property_type?.map(Number) ?? [],
        },
      },
      {
        onSuccess: () => {
          showSuccessMessage('Property created');
          onSuccess?.();
        },
        onError: (err) => {
          showErrorMessage(err);
        },
      }
    );
  };

  const closeDialog = () => {
    onClose();
  };

  return (
    <BaseDialog isOpen={isOpen} size="4xl" onClose={closeDialog}>
      <DialogBody>
        <DialogTitle>Add Property</DialogTitle>
        <form className="py-2">
          <Form {...form}>
            <AdminPropertyForm existGroups={existGroups} formPack={formPack} />
          </Form>
        </form>
        <DialogFooter>
          <Button className={cn('border-default-200')} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className={cn('border-default-200')}
            variant="ghost"
            onClick={() => {
              clearMiscellaneous();
            }}
          >
            Reset (except types)
          </Button>
          <Button
            className={cn('border-default-200')}
            variant="destructive"
            onClick={() => {
              form.reset();
            }}
          >
            Full Reset
          </Button>
          <Button
            disabled={isPending}
            variant="secondary"
            onClick={form.handleSubmit(
              createProperty(() => {
                form.reset();
                onClose();
              })
            )}
          >
            {isPending ? <Loader2 className="animate-spin" /> : null}
            Create & Exit
          </Button>
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(
              createProperty(() => {
                clearMiscellaneous();
              })
            )}
          >
            {isPending ? <Loader2 className="animate-spin" /> : null}
            Create
          </Button>
        </DialogFooter>
      </DialogBody>
    </BaseDialog>
  );
});
