import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const updateIncreaseWins = async (userId: number, botUsername: string) => {
  const res = await axios.post<{ message: string }>(
    `${VITE_APP_API_URL}/increase_wins/${userId}?bot_username=${botUsername}`,
  );
  const data = res.data;

  return data;
};
