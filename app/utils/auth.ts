import { User } from "../store/useAuthStore";
import { AUTH_CONSTANTS } from "../constants/auth";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const formatUserName = (user: User): string => {
  if (user.given_name && user.family_name) {
    return `${user.given_name} ${user.family_name}`;
  }
  return user.name || user.email.split("@")[0];
};

export const getInitials = (user: User): string => {
  if (user.given_name && user.family_name) {
    return `${user.given_name[0]}${user.family_name[0]}`.toUpperCase();
  }
  return user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();
};

export const isTokenExpired = (token: string): boolean => {
  try {
    // Google OAuth tokens don't have a standard expiration time in the token itself
    // We'll use a conservative approach and assume tokens expire after 1 hour
    // In a real app, you'd want to implement proper token refresh logic
    return false; // For now, we'll let the API calls fail naturally
  } catch (error) {
    return true;
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_CONSTANTS.SESSION_STORAGE_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.USER_STORAGE_KEY);
};
