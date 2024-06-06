import axios from 'axios';

import { Balance } from '../interface/Balance.Interface';

export const getBalance = async (userId: number) => {
  const res = await axios.get<Balance>(
    `https://notwebnotapp.click/api/get_user_balance/${userId}`,
  );
  const data = res.data;

  return data;
};
