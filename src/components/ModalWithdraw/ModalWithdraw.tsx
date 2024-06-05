import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

const ModalWithdraw: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const placeholderDetails = intl.formatMessage({
    id: 'withdraw_modal_placeholder_details',
  });

  const placeholderAmount = intl.formatMessage({
    id: 'withdraw_modal_placeholder_amount',
  });

  const labelAmount = intl.formatMessage({ id: 'amount' });
  const labelDetails = intl.formatMessage({ id: 'details' });

  return (
    <>
      <Button onClick={handleOpen} className='bg-primary-100 text-xs px-[7px] py-0.5'>
        <FormattedMessage id='withdraw_btn' />
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className='min-w-[285px]'>
          <div className='text-center font-bold text-lg'>
            <FormattedMessage id='withdraw_funds' />
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <Input placeholder={placeholderDetails} label={labelDetails} />
            <Input placeholder={placeholderAmount} label={labelAmount} />
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <Button type='submit' className='bg-primary-100 w-full rounded-[4px]'>
              <FormattedMessage id='submit' />
            </Button>
            <Button
              type='button'
              className='!text-primary-100 w-full rounded-[4px]'
              onClick={handleClose}
            >
              <FormattedMessage id='close' />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWithdraw;
