export const functToObj = function <T extends object, Args extends unknown[]>(
  input?: T | ((...args: Args) => T),
  ...args: Args
) {
  return typeof input === 'function' ? input(...args) : input;
};
