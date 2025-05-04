import { useState } from "react";
import { ProfileForm } from "../interface/userRegistration";
import { updateRegister } from "../redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../components/SnackbarProvider";
import { AuthResponseRegister } from "../interface/userResponse";
import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? ''; 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AuthResponseRegister | null>(null);

  const register = async (userData: ProfileForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      dispatch(updateRegister(data));
      showSnackbar("Registration successful!", "success");
      navigate("/home"); // Redirect to Stepper page after successful registration
      setResponse(data);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Unknown error");
      showSnackbar(err.message, "error");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, response };
};
