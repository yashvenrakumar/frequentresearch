export interface ResetPasswordPayload {
  username: string;
  currentPassword: string;
  newPassword: string;
}

export interface UseResetPasswordReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  resetPassword: (data: ResetPasswordPayload) => Promise<void>;
}

export interface UploadImageResponse {
  statusCode: number;
  message: string;
  data: string; // URL of the uploaded image
}
