import ResizeObserver from 'resize-observer-polyfill';

export const subscribeToResize = (
  element: Element | null,
  callback: (size: DOMRectReadOnly) => void
) => {
  if (!element) {
    return () => {
      return;
    };
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      callback(entry.contentRect);
    }
  });

  resizeObserver.observe(element);

  return () => {
    if (element) {
      resizeObserver.unobserve(element);
    }
    resizeObserver.disconnect();
  };
};
