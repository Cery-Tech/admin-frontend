declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_API_KEY: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      NEXT_PUBLIC_ENV: 'staging' | 'production' | 'development' | 'preview';
      NEXT_PUBLIC_USER_API_URL: string;
      NEXT_PUBLIC_ADMIN_API_URL: string;
    }
  }
}

export {};
