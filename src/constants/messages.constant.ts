export const MESSAGES = {
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",

  AUTH_SUCCESS: "Authentication successful",
  AUTH_FAILED: "Authentication failed",
  INVALID_CREDENTIALS: "Invalid credentials",
  TOKEN_EXPIRED: "Token has expired",
  TOKEN_INVALID: "Invalid token",
  ACCESS_DENIED: "Access denied",

  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User already exists",

  SUCCESS: "Operation successful",
  ERROR: "An error occurred",
  VALIDATION_ERROR: "Validation error",

  PASSWORD_RESET_SENT: "Password reset email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successful",
  PASSWORD_CHANGED: "Password changed successfully",
  WEAK_PASSWORD: "Password is too weak",
} as const;