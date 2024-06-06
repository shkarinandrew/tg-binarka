import { createContext } from 'react';

import { Channel } from '../interface/Channel.interface';

export const ChannelContext = createContext<Channel | null>(null);
