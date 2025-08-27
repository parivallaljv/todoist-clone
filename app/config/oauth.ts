export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your-google-client-id",
    SCOPES: ["email", "profile"],
  },
  FACEBOOK: {
    APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "your-facebook-app-id",
    SCOPES: ["public_profile"],
    VERSION: "v18.0",
  },
  APPLE: {
    CLIENT_ID:
      process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "your.apple.client.id",
    REDIRECT_URI:
      process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || "http://localhost:3000",
    SCOPES: ["name", "email"],
  },
} as const;

export const OAUTH_ERROR_MESSAGES = {
  GOOGLE_LOGIN_FAILED: "Google login failed. Please try again.",
  FACEBOOK_LOGIN_FAILED: "Facebook login failed. Please try again.",
  APPLE_LOGIN_FAILED: "Apple login failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  USER_CANCELLED: "Login was cancelled by the user.",
} as const;
