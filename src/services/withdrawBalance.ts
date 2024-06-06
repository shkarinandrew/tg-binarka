import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const withdrawBalance = async (
  userId: number,
  amount: number,
  botUsername: string,
) => {
  const res = await axios.post<{ message: string }>(
    `${VITE_APP_API_URL}/withdraw_balance/${userId}/${amount}/${botUsername}`,
  );
  const data = res.data;

  return data;
};
