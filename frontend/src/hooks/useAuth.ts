// hooks/useAuth.ts
import { useState } from 'react';
import { AuthResponse, LoignPayload, RegisterPayload, RegisterResponse, User } from '../interface/user';
import axios, { AxiosError } from 'axios';
import { updateLoginInfo } from '../redux/slice/userAuthSlice';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch=useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loginResponse, setLoginResponse] = useState<AuthResponse | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL ?? ''; 

  const register = async (payload: RegisterPayload): Promise<void> => {
    setLoading(true);
    setError(null);
     try {

 
       const response = await axios.post<RegisterResponse>(
        `${apiUrl}/api/users/register`,
        payload
      );

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      
      setError(axiosError.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: LoignPayload): Promise<void> => {
    setLoading(true);
    setError(null);
     try {

 
       const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/users/login`,
        payload
      );



      dispatch(updateLoginInfo(response.data)) 
      setLoginResponse(response.data)

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
     } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async (payload: LoignPayload): Promise<void> => {
    setLoading(true);
    setError(null);
     try {

 
       const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/users/login`,
        payload
      );



      dispatch(updateLoginInfo(response.data)) 
       setLoginResponse(response.data)

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    resetPassword,
    loading,
    loginResponse,
    error,
    user,
    accessToken,
    refreshToken,
  };
};

export default useAuth;
