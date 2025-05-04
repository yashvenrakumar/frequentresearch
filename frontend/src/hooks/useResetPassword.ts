import { useState } from "react";
import axios from "axios";
import {
  ResetPasswordPayload,
  UseResetPasswordReturn,
} from "../interface/reserPassword";

export const useResetPassword = (): UseResetPasswordReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL ?? "";

  const resetPassword = async (data: ResetPasswordPayload): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${apiUrl}/users/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, resetPassword };
};
