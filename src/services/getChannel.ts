import axios from 'axios';

import { Channel } from '../interface/Channel.interface';

export const getChannel = async (botUsername: string) => {
  const res = await axios.get<Channel>(
    `https://gw.dev.slaver.vip/webapp/credentials/${botUsername}`,
  );
  const data = res.data;

  return data;
};
