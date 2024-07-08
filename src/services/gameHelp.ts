import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const gameHelp = async (userId: number, botUsername: string) => {
  const res = await axios.post(`${VITE_APP_API_URL}/get-help`, {
    userId,
    botUsername,
  });
  const data = res.data;

  return data;
};
