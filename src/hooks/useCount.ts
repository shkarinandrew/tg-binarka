import { useContext } from 'react';

import { CountContext } from '../context/CountContext';

export const useCount = () => {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
};
