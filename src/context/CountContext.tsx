import { createContext, FC, useState } from 'react';

type CountContextType = {
  count: number;
  updateCount: (newCount: number) => void;
};

interface CountContextProps {
  children: React.ReactNode;
}

export const CountContext = createContext<CountContextType | null>(null);

export const CountContextProvider: FC<CountContextProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const updateCount = (newCount: number) => setCount(newCount);

  const contextValue: CountContextType = {
    count,
    updateCount,
  };

  return <CountContext.Provider value={contextValue}>{children}</CountContext.Provider>;
};
