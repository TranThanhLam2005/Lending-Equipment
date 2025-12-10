/**
 * Event handlers for authentication-related actions
 * Separated from UI components for better testability and reusability
 */

import {authService} from "@/api/auth.service";
import {ROUTES} from "@/api/config";
import type {LoginCredentials} from "@/types/Type";

/**
 * Handle user login
 * Performs login and navigates on success
 */
export const handleLogin = async (
  credentials: LoginCredentials,
  navigate: (path: string, options?: any) => void,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    await authService.login(credentials);

    if (onSuccess) {
      onSuccess();
    }

    // Navigate to dashboard or home after successful login
    navigate(ROUTES.STUDENT_DASHBOARD, {replace: true});
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";

    if (onError) {
      onError(errorMessage);
    }

    throw error;
  }
};

/**
 * Handle user logout
 * Clears session and navigates to home
 */
export const handleLogout = async (
  navigate: (path: string, options?: any) => void,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    await authService.logout();

    if (onSuccess) {
      onSuccess();
    }

    // Navigate to home page after logout
    navigate(ROUTES.HOME, {replace: true});
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";

    if (onError) {
      onError(errorMessage);
    }

    throw error;
  }
};

/**
 * Handle forgot password request
 */
export const handleForgotPassword = async (
  email: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    await authService.forgotPassword(email);

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send password reset email";

    if (onError) {
      onError(errorMessage);
    }

    throw error;
  }
};

/**
 * Verify user session
 */
export const verifySession = async (
  onSuccess?: (data: any) => void,
  onError?: (error: string) => void
): Promise<any> => {
  try {
    const response = await authService.verifySession();

    if (onSuccess) {
      onSuccess(response.data);
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Session verification failed";

    if (onError) {
      onError(errorMessage);
    }

    throw error;
  }
};
