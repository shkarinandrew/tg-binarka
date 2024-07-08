import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const gameResult = async (
  userId: number,
  botUsername: string,
  win: boolean,
  amount: number,
) => {
  const res = await axios.post(`${VITE_APP_API_URL}/game-result`, {
    userId,
    botUsername,
    win,
    amount,
  });
  const data = res.data;

  return data;
};
