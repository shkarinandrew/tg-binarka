import { createContext } from 'react';

interface ISubscribeModalContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SubscribeModalContext = createContext<ISubscribeModalContext | null>(null);
