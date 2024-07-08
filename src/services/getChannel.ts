import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export type ChannelType = {
  channel_picture: string;
  channel_title: string;
  invite_link: string;
};

export const getChannel = async (botUsername: string) => {
  const res = await axios.post<ChannelType>(`${VITE_APP_API_URL}/get-channel`, {
    botUsername,
  });
  const data = res.data;

  return data;
};
