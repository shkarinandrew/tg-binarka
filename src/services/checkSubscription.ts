import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const checkSubscription = async (userId: number, botUsername: string) => {
  const res = await axios.get<boolean>(`${VITE_APP_API_URL}/check-subscription`, {
    params: {
      userId,
      botUsername,
    },
  });
  const data = res.data;

  return data;
};
