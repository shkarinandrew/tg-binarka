import axios from 'axios';

export const getNeedHelp = async (userId: string, bot_username: string) => {
  const res = await axios.post(`https://notwebnotapp.click/api/need_help/${userId}`, {
    data: {
      bot_username,
    },
  });
  const data = res.data;

  return data;
};
