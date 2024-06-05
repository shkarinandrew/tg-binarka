import { FC, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { SyncLoader } from 'react-spinners';

import { ChannelContext } from '../../Context/ChannelContext';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';
import { Channel } from '../../interface/Channel.interface';
import HomePage from '../../pages/HomePage';
import { getChannel } from '../../services/getChannel';
import ModalSubscribe from '../ModalSubscribe';

const App: FC = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChannel('binarkagogogo_bot')
      .then((data) => {
        setChannel(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
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
        defaultLocale={'en'}
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
