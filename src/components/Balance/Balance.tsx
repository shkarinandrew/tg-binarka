import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import ModalWithdraw from '../ModalWithdraw';
import { IBalance } from './Balance.interface';

const Balance: FC<IBalance> = ({ value }) => {
  return (
    <div className='flex items-center justify-between border-2 border-purple text-white py-[10px] px-2 rounded-2xl'>
      <div className='text-sm font-medium'>
        <FormattedMessage id='balance' />: <span className='font-semibold'>${value}</span>
      </div>
      <ModalWithdraw />
    </div>
  );
};

export default Balance;
