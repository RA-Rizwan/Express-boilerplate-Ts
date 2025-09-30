export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  timestamp: string;
}

export class ApiResponseUtil {
  static success<T>(data: T, message = "Success"): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    };
  }

  static validationError(errors: any[]): ApiResponse {
    return {
      success: false,
      message: "Validation failed",
      error: errors,
      timestamp: new Date().toISOString(),
    };
  }
}
