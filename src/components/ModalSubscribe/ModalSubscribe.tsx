import { useUtils } from '@tma.js/sdk-react';
import { FC, useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ChannelContext } from '../../context/ChannelContext';
import Button from '../Button';
import Modal from '../Modal';
import { IModalSubscribe } from './ModalSubscribe.interface';

const ModalSubscribe: FC<IModalSubscribe> = ({ channelName, channelSrc }) => {
  const context = useContext(ChannelContext);
  const [isOpen, setIsOpen] = useState(true);

  const utils = useUtils();

  const handleSubscribe = () => {
    if (!context?.invite_link) return;

    utils.openTelegramLink(context.invite_link);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className='min-w-[285px] max-w-[300px] flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <div className='w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-primary-100'>
            <img
              className='w0full h-full object-cover'
              src={channelSrc}
              alt={channelName}
            />
          </div>
          <div className='text-xs uppercase font-medium text-center'>{channelName}</div>
        </div>
        <div className='text-gray font-medium text-sm text-center'>
          <FormattedMessage id='subscribe_context' />
        </div>
        <Button
          onClick={handleSubscribe}
          className='text-base font-medium uppercase mt-5 bg-gradient-to-r from-[#FF739D] via-purple to-primary-100 px-14 py-3'
        >
          <FormattedMessage id='subscribe_btn' />
        </Button>
      </div>
    </Modal>
  );
};

export default ModalSubscribe;
