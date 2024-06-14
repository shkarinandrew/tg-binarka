import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const getWins = async (userId: number, botUsername: string) => {
  const res = await axios.get<{ wins: number }>(
    `${VITE_APP_API_URL}/get_wins/${userId}?botUsername=${botUsername}`,
  );
  const data = res.data;

  return data;
};
