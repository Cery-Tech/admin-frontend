import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  loading?: boolean;
  loader?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export const LoaderButton = ({ loading, loader, children, disabled, ...props }: Props) => {
  return (
    <Button disabled={loading || disabled} {...props} className={cn('relative', props.className)}>
      {loading
        ? (loader ?? (
            <span
              className={cn(
                'flex items-center justify-center',
                props.size === 'icon' ? 'absolute inset-0' : ''
              )}
            >
              <Loader2 className="animate-spin" />
            </span>
          ))
        : null}
      {children}
    </Button>
  );
};
