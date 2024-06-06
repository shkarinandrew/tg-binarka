import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

type WithdrawBalance = {
  message: string;
  new_balance: number;
};

export const withdrawBalance = async (
  userId: number,
  amount: number,
  botUsername: string,
) => {
  const res = await axios.post<WithdrawBalance>(
    `${VITE_APP_API_URL}/withdraw_balance/${userId}/${amount}/${botUsername}`,
  );
  const data = res.data;

  return data;
};
