import type { KeyboardEvent, SyntheticEvent } from 'react';

export const handleClickPressListeners = <T extends HTMLElement>(
  listener: (event: SyntheticEvent<T> | KeyboardEvent<T>) => void
) => ({
  onClick: listener,
  onKeyPress: (e: KeyboardEvent<T>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      listener(e);
    }
  },
});
