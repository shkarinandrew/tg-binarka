import axios from 'axios';

import { Channel } from '../interface/Channel.interface';

const { VITE_APP_GATEWAY_URL } = import.meta.env;

export const getChannel = async (botUsername: string) => {
  const res = await axios.get<Channel>(
    `${VITE_APP_GATEWAY_URL}/webapp/credentials/${botUsername}`,
  );
  const data = res.data;

  return data;
};
