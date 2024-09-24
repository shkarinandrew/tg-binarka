import { createContext, FC, useState } from 'react';

type GameContextType = {
  start: number;
  end: number;
  updateStart: (number: number) => void;
  updateEnd: (number: number) => void;
};

interface GameContextProps {
  children: React.ReactNode;
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider: FC<GameContextProps> = ({ children }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const updateStart = (number: number) => setStart(number);
  const updateEnd = (number: number) => setEnd(number);

  const contextValue: GameContextType = {
    start,
    end,
    updateStart,
    updateEnd,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
