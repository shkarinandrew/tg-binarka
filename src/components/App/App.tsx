import { useInitData } from '@tma.js/sdk-react';
import { FC, useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';

import { ChannelContext } from '../../Context/ChannelContext';
import { Channel } from '../../interface/Channel.interface';
import { getChannel } from '../../services/getChannel';

const App: FC = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initData = useInitData();

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
      {/* <IntlProvider
        messages={messages[LOCALES[channel?.geo || 'en'].value]}
        locale={LOCALES[channel?.geo || 'en'].value}
        defaultLocale={LOCALES[channel?.geo || 'en'].value}
      > */}
      {JSON.stringify(initData)}
      {/* <HomePage /> */}
      {/* {channel && (
        <ModalSubscribe
          channelName={channel.channel_title}
          channelSrc={channel.image_link}
        />
      )} */}
      {/* </IntlProvider> */}
    </ChannelContext.Provider>
  );
};

export default App;
