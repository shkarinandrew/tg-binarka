import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const updateBalance = async (userId: number, amount: number) => {
  const res = await axios.post(`${VITE_APP_API_URL}/update_balance/${userId}/${amount}`);
  const data = res.data;

  return data;
};
