import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import RadioIcon from '../../assets/icons/radio.svg';
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
            <div className='inline-flex items-center'>
              <label
                className='relative flex items-center p-3 rounded-full cursor-pointer'
                htmlFor='black'
              >
                <input
                  name='color'
                  type='radio'
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray before:opacity-0 before:transition-opacity checked:border-gray checked:before:bg-gray hover:before:opacity-10"
                  id='black'
                />
                <span className='absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                  <RadioIcon />
                </span>
              </label>
            </div>
            <div className='inline-flex items-center'>
              <label
                className='relative flex items-center p-3 rounded-full cursor-pointer'
                htmlFor='gray'
              >
                <input
                  name='color'
                  type='radio'
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                  id='gray'
                />
                <span className='absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                  <RadioIcon />
                </span>
              </label>
            </div>
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
