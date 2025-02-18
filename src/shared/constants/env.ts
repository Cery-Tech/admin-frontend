export const APP_ENV = process.env.NEXT_PUBLIC_ENV;
export const IS_STAGING = APP_ENV === 'staging';
export const IS_DEV = APP_ENV === 'development';
export const IS_PROD = APP_ENV === 'production';
export const IS_PREVIEW = APP_ENV === 'preview';
