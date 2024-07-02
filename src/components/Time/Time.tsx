import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { ITime } from './Time.interface';

const Time: FC<ITime> = ({ value }) => {
  return (
    <div className='w-full text-white text-[10px] sm:text-[12px] lg:text-[13px] py-[3px] lg:py-[1px] px-2 text-center font-bold uppercase rounded-md bg-[#313131]'>
      {value} <FormattedMessage id='second' />
    </div>
  );
};

export default Time;
