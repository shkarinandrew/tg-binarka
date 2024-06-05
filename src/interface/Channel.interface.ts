import { LOCALES } from '../i18n/locales';

type Language = keyof typeof LOCALES;

export interface Channel {
  bot_token: string;
  channel_id: string;
  channel_title: string;
  geo: Language;
  image_link: string;
  invite_link: string;
}
