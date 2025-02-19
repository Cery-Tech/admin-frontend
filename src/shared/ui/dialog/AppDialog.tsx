import type { ComponentPropsWithRef, MouseEventHandler, PropsWithChildren } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogBody, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { BaseDialog } from './BaseDialog';

export type AppDialogProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  processing?: boolean;
  leftBtnTitle?: React.ReactNode;
  rightBtnTitle?: React.ReactNode;
  onRightBtnClick?: MouseEventHandler<HTMLButtonElement>;

  slotProps?: {
    base?: Partial<ComponentPropsWithRef<typeof BaseDialog>>;
    body?: ComponentPropsWithRef<typeof DialogBody>;
    title?: ComponentPropsWithRef<typeof DialogTitle>;
    footer?: ComponentPropsWithRef<typeof DialogFooter>;
    leftBtn?: ComponentPropsWithRef<typeof Button>;
    rightBtn?: ComponentPropsWithRef<typeof Button>;
  };
}>;

export const AppDialog = function AppDialog({
  title,
  children,
  isOpen,
  onClose,
  onRightBtnClick,
  leftBtnTitle = 'Cancel',
  rightBtnTitle = 'Confirm',
  processing,
  slotProps,
}: AppDialogProps) {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose} {...slotProps?.base}>
      <DialogBody {...slotProps?.body}>
        <DialogTitle {...slotProps?.title}>{title}</DialogTitle>
        {children}
        <DialogFooter {...slotProps?.footer}>
          <Button
            variant="outline"
            onClick={onClose}
            {...slotProps?.leftBtn}
            className={twMerge(clsx('border-default-200', slotProps?.leftBtn?.className))}
          >
            {slotProps?.leftBtn?.children ?? leftBtnTitle}
          </Button>
          <Button
            color="primary"
            disabled={processing}
            {...slotProps?.rightBtn}
            onClick={onRightBtnClick ?? slotProps?.rightBtn?.onClick}
          >
            {processing ? <Loader2 className="animate-spin" /> : null}
            {slotProps?.rightBtn?.children ?? rightBtnTitle}
          </Button>
        </DialogFooter>
      </DialogBody>
    </BaseDialog>
  );
};
