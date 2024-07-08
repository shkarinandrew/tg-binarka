import { createContext } from 'react';

import { ChannelType } from '../services/getChannel';

export const ChannelContext = createContext<ChannelType | null>(null);
