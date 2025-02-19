declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_API_KEY: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      VITE_ENV: 'staging' | 'production' | 'development' | 'preview';
      VITE_USER_API_URL: string;
      VITE_ADMIN_API_URL: string;
      VITE_EQUIPMENT_API_URL: string;
    }
  }
}

export {};
