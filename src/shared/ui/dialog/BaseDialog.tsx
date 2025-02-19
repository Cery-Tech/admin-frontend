'use client';

import type { DialogContentProps } from '@radix-ui/react-dialog';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { twMerge } from 'tailwind-merge';

type Props = DialogContentProps & {
  isOpen?: boolean;
  onClose?: () => void;
  withoutCloseButton?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  size?: DialogSizes;
  onCloseButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type DialogSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';

export type UseBaseDialogStateProps = Props;

const sizeMap: Record<DialogSizes, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full',
};

export const BaseDialog = function BaseDialog({
  isOpen,
  onClose,
  withoutCloseButton,
  size = 'md',
  defaultOpen,
  modal = true,
  onCloseButtonClick,
  ...props
}: Props) {
  return (
    <Dialog
      defaultOpen={defaultOpen}
      modal={modal}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}
    >
      <DialogContent
        {...props}
        className={twMerge(
          `${sizeMap[size]} w-full max-h-[calc(100dvh_-_2rem)] flex flex-col`,
          props.className
        )}
        withoutCloseButton={withoutCloseButton}
        onCloseButtonClick={onCloseButtonClick}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
