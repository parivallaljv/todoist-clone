declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_FACEBOOK_APP_ID: string;
      NEXT_PUBLIC_APPLE_CLIENT_ID: string;
      NEXT_PUBLIC_APPLE_REDIRECT_URI: string;
    }
  }
}

export {};
