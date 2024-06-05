import axios, { Method } from 'axios';
import { useEffect, useState } from 'react';

type ResponseAxios<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

export const useAxios = <T = any, B = any>(
  url: string,
  method: Method,
  body?: B,
): ResponseAxios<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data,
        });
        setData(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => setLoading(false);
  }, [url, method, body]);

  return { loading, error, data };
};
