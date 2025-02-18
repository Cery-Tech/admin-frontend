import type { ExternalToast } from 'sonner';

import { toast } from 'sonner';

type Message = Parameters<typeof toast>[0];

export const parseErrorMessage = (message: unknown) => {
  if (
    message &&
    typeof message === 'object' &&
    'message' in message &&
    typeof message.message === 'string'
  ) {
    return message.message;
  }

  const error =
    typeof message === 'object' && message && 'error' in message
      ? (message as { error: unknown }).error
      : message;
  const errorMessage =
    error && typeof error === 'object' && 'message' in error
      ? (error as { message: string }).message
      : error instanceof Error
        ? error.message
        : (error as string);

  return errorMessage;
};

export const showErrorMessage = (
  message: unknown = 'Something went wrong...',
  options?: ExternalToast
) => {
  toast.error(parseErrorMessage(message), options);
};

export const showSuccessMessage = (message: Message = 'Successful!', options?: ExternalToast) => {
  toast.success(message, options);
};

export const showToastNearCursor = (
  e: React.MouseEvent,
  message: string,
  options?: { duration: number }
) => {
  const { clientX, clientY } = e;

  // Create the toast element
  const toast = document.createElement('div');

  // Style the toast element
  Object.assign(toast.style, {
    position: 'fixed',
    top: `${clientY + 10}px`, // Offset by 10px
    left: `${clientX + 10}px`, // Offset by 10px
    background: '#333',
    color: '#fff',
    padding: '4px 6px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    transition: 'opacity 0.3s ease-in-out',
    opacity: '1',
  });

  toast.textContent = message;
  document.body.appendChild(toast);

  // Hide the toast after options.duration seconds
  setTimeout(() => {
    toast.style.opacity = '0'; // Fade-out effect
    setTimeout(() => {
      document.body.removeChild(toast); // Cleanup after fade-out
    }, 300); // Match the fade-out transition duration
  }, options?.duration ?? 2000);
};
