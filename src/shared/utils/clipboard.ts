import { toast } from 'sonner';

import { showToastNearCursor } from './toasts';

export function copyToClipboard(
  data?: string,
  {
    textInfo = 'Copied in clipboard!',
    duration = 2500,
    e,
  }: {
    textInfo?: string;
    e?: React.MouseEvent;
    duration?: number;
  } = {}
) {
  if (!data) {
    return;
  }
  try {
    navigator.clipboard.writeText(data).then(() => {
      if (e?.clientX && e.clientY) {
        showToastNearCursor(e, textInfo, { duration });

        return;
      }
      toast(textInfo, {
        position: 'top-right',
        duration: 2500,
      });
    });
  } catch {
    return;
  }
}
