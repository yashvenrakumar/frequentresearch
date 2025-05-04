import { useState } from 'react';
import { UsernameCheckResponse } from '../interface/userRegistration';

 
const useCheckUsername = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? ''; 

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UsernameCheckResponse | null>(null);

  const checkUsername = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

 
    try {
      // Append username as a query parameter to the URL
      const res = await fetch(`${apiUrl}/users/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // Send the username in the request body
      });

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const data: UsernameCheckResponse = await res.json();
      setResponse(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkUsername,
    isLoading,
    error,
    response,
  };
};

export default useCheckUsername;
