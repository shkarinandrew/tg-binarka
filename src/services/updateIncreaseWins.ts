import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const updateIncreaseWins = async (userId: number) => {
  const res = await axios.post<boolean>(`${VITE_APP_API_URL}/increase_wins/${userId}`);
  const data = res.data;

  return data;
};
