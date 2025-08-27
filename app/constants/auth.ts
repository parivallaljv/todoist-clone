export const AUTH_CONSTANTS = {
  GOOGLE_USERINFO_URL: "https://www.googleapis.com/oauth2/v2/userinfo",
  MIN_PASSWORD_LENGTH: 8,
  SESSION_STORAGE_KEY: "todoist_auth_token",
  USER_STORAGE_KEY: "todoist_user_data",
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD: "Password must be at least 8 characters long",
  LOGIN_FAILED: "Login failed. Please try again.",
  SIGNUP_FAILED: "Signup failed. Please try again.",
  GOOGLE_LOGIN_FAILED: "Google login failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
} as const;

export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  SIGNUP_SUCCESS: "Account created successfully!",
  LOGOUT_SUCCESS: "Logged out successfully!",
} as const;
