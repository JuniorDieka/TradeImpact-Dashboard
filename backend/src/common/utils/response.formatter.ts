export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

export class ResponseFormatter {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message: message || 'Operation successful',
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string): ApiResponse<null> {
    return {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
