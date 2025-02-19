import { useCallback, useRef, useState } from 'react';

import { create } from 'zustand';

type DialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type UseDialogReturn = DialogState;

export function useDialog(initial = false) {
  const [isOpen, setState] = useState<boolean>(initial);

  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);

  const value = useRef({
    isOpen,
    open,
    close,
  }).current;

  value.isOpen = isOpen;

  return value;
}

export function createGlobalDialogState<T>() {
  const useState = create<{
    state: T | null;
    open: (state: T) => void;
    close: () => void;
  }>((set) => ({
    state: null,
    open: (state) => set({ state }),
    close: () => set({ state: null }),
  }));

  const useDialog = function () {
    const state = useState((state) => state.state);
    const open = useState((state) => state.open);
    const close = useState((state) => state.close);

    const dialog = useRef({
      isOpen: !!state,
      state,
      open,
      close,
    }).current;

    const isOpen = state !== null && state !== undefined;

    dialog.isOpen = isOpen;
    dialog.state = state;

    if (isOpen) {
      return dialog as DialogStateBase<T, T, true>;
    }

    return dialog as DialogStateBase<T, null, false>;
  };

  const useDialogActions = function () {
    const open = useState((state) => state.open);
    const close = useState((state) => state.close);

    return useRef({ open, close }).current;
  };

  return { useDialog, useDialogActions };
}

export type DialogStateBase<T, State, IsOpen extends boolean> = {
  isOpen: IsOpen;
  state: State;
  open: (newState: T | null) => void;
  close: () => void;
};
type DialogStateExtended<T, State, IsOpen extends boolean> = DialogStateBase<T, State, IsOpen> & {
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  startProcessing: () => void;
  finishProcessing: () => void;
};

export type UseDialogStateReturn<T> =
  | DialogStateExtended<T, T, true>
  | DialogStateExtended<T, null, false>;

export default function useDialogState<T>(initial: T | null = null) {
  const [state, setState] = useState<T | null>(initial);
  const [processing, setProcessing] = useState(false);

  const open = useCallback((newState: T) => setState(newState), []);
  const close = useCallback(() => setState(null), []);

  const startProcessing = useCallback(() => setProcessing(true), []);
  const finishProcessing = useCallback(() => setProcessing(false), []);

  const isOpen = state !== null && state !== undefined;

  const value = useRef({
    isOpen,
    processing,
    state,
    open,
    close,
    setProcessing,
    startProcessing,
    finishProcessing,
  }).current;

  value.isOpen = isOpen;
  value.state = state;
  value.processing = processing;

  if (isOpen) {
    return value as DialogStateExtended<T, T, true>;
  }

  return value as DialogStateExtended<T, null, false>;
}
