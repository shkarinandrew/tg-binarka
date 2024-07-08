import axios from 'axios';
import { LOCALES } from '../i18n/locales';

const { VITE_APP_API_URL } = import.meta.env;

export type UserProfileType = {
  balance: number;
  bot: string;
  createdAt: string;
  firstName: string;
  id: string;
  languageCode: keyof typeof LOCALES;
  lastName: string;
  subscriptionStatus: boolean;
  telegramId: string;
  updatedAt: string;
  wins: number;
};

export const getUserProfile = async (userId: number, botUsername: string) => {
  const res = await axios.get<UserProfileType>(`${VITE_APP_API_URL}/user-profile`, {
    params: {
      userId,
      botUsername,
    },
  });
  const data = res.data;

  return data;
};
