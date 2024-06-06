import axios from 'axios';

const { VITE_APP_API_URL } = import.meta.env;

export const getNeedHelp = async (userId: number, bot_username: string) => {
  const res = await axios.post(`${VITE_APP_API_URL}/need_help/${userId}`, {
    data: {
      bot_username,
    },
  });
  const data = res.data;

  return data;
};
