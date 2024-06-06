import axios from 'axios';

export const updateBalance = async (userId: number, amount: number) => {
  const res = await axios.post(
    `https://notwebnotapp.click/api/update_balance/${userId}/${amount}`,
  );
  const data = res.data;

  return data;
};
