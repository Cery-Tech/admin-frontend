// import { isServer } from './browser-server';

export const getCookieStore = async (): Promise<null | {
  get: (name: string) => { name: string; value: string } | undefined;
}> => {
  // if (isServer()) {
  //   return await cookies();
  // }

  return Promise.resolve(null);
};
