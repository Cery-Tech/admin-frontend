export {};
declare global {
  interface Window {
    setApi: (key: string, api: string) => void;
  }
}
