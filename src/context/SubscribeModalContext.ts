import { createContext } from 'react';

interface ISubscribeModalContext {
  isSubscribed: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SubscribeModalContext = createContext<ISubscribeModalContext | null>(null);
