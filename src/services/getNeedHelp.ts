import axios from 'axios';

export const getNeedHelp = async (userId: string, botUsername: string) => {
  const res = await axios.get(
    `https://notwebnotapp.click/api/need_help/${userId}/${botUsername}`,
  );
  const data = res.data;

  return data;
};
