import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import ModalWithdraw from '../ModalWithdraw';
import { IBalance } from './Balance.interface';

const { VITE_COUNT_WIN_OR_LOSE } = import.meta.env;

const Balance: FC<IBalance> = ({ value, isWin }) => {
  const isNotNullWin = isWin !== null;
  const classNameIsWin = isNotNullWin ? (isWin ? 'text-green' : 'text-red') : '';

  const plusOrMinus = isWin ? '+' : '-';

  return (
    <div className='flex items-center justify-between border-2 border-purple text-white py-[10px] px-2 rounded-2xl'>
      <div className='text-sm font-medium'>
        <FormattedMessage id='balance' />: <span className='font-semibold'>${value}</span>{' '}
        {isNotNullWin && (
          <span className={`font-semibold ${classNameIsWin}`}>
            {plusOrMinus}${VITE_COUNT_WIN_OR_LOSE}
          </span>
        )}
      </div>
      <ModalWithdraw balance={value} />
    </div>
  );
};

export default Balance;
