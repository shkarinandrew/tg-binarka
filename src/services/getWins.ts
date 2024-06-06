import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const getWins = async (userId: number) => {
  const res = await axios.post<boolean>(`${VITE_APP_API_URL}/get_wins/${userId}`);
  const data = res.data;

  return data;
};
