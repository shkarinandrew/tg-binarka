import axios from 'axios';

import { Subscription } from '../interface/Subsription.interface';

const { VITE_APP_API_URL } = import.meta.env;

export const getCheckSubscription = async (userId: number, bot_username: string) => {
  const res = await axios.get<Subscription>(
    `${VITE_APP_API_URL}/check_subscription/${userId}/${bot_username}`,
  );
  const data = res.data;

  return data;
};
