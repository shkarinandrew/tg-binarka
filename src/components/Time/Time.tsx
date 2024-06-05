import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { ITime } from './Time.interface';

const Time: FC<ITime> = ({ value }) => {
  return (
    <div className='w-full text-white text-[10px] py-[5px] px-2 text-center font-bold uppercase rounded-md bg-[#313131]'>
      {value} <FormattedMessage id='second' />
    </div>
  );
};

export default Time;
