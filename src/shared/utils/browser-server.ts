export const isServer = () => {
  return typeof window === 'undefined' || 'Deno' in globalThis;
};

export const isBrowser = () => !isServer();
