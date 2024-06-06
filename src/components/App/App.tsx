import { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { SyncLoader } from 'react-spinners';

import { ChannelContext } from '../../context/ChannelContext';
import { useAxios } from '../../hooks/useAxios';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';
import { Channel } from '../../interface/Channel.interface';
import HomePage from '../../pages/HomePage';
import { findBotUsername } from '../../utils/findBotUsername';
import ModalSubscribe from '../ModalSubscribe';

const App: FC = () => {
  // TODO: убрать мок
  const botUsername = findBotUsername() || 'binarkagogogo_bot';

  const { loading, data: channel } = useAxios<Channel>(
    `https://gw.dev.slaver.vip/webapp/credentials/${botUsername}`,
    'GET',
  );

  if (loading)
    return (
      <div className='w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black text-white'>
        <SyncLoader color='#fff' />
      </div>
    );

  return (
    <ChannelContext.Provider value={channel}>
      <IntlProvider
        messages={messages[LOCALES[channel?.geo || 'en'].value]}
        locale={LOCALES[channel?.geo || 'en'].value}
        defaultLocale={LOCALES.en.value}
      >
        <HomePage />
        {channel && (
          <ModalSubscribe
            channelName={channel.channel_title}
            channelSrc={channel.image_link}
          />
        )}
      </IntlProvider>
    </ChannelContext.Provider>
  );
};

export default App;
