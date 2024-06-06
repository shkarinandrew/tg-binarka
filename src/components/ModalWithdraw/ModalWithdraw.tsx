import { useInitData } from '@tma.js/sdk-react';
import { useFormik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { withdrawBalance } from '../../services/withdrawBalance';
import { findBotUsername } from '../../utils/findBotUsername';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import { IModalWithdraw } from './ModalWithdraw.interface';

const ModalWithdraw: FC<IModalWithdraw> = ({ balance, setBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);

  const intl = useIntl();

  const initData = useInitData();
  const userId = initData?.user?.id;

  const botUsername = findBotUsername();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const validationSchema = Yup.object({
    amount: Yup.string().trim().required('Введите номер карты или счета'),
    details: Yup.string()
      .trim()
      .matches(/^\d+$/, 'Поле должно содержать только цифры')
      .test(
        'length',
        (value) => {
          const count = parseInt(value.value, 10);
          if (count > balance) {
            return `Превышен лимит, вам доступно ${balance}$`;
          }
        },
        () => {
          return false;
        },
      )
      .required('Введите сумму вывода'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      details: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const details = parseInt(values.details, 10);
      withdrawBalance(userId || 0, details, botUsername || '').then(
        ({ new_balance, message }) => {
          setBalance(new_balance);
          handleClose();
          alert(message);
        },
      );
    },
  });

  const placeholderDetails = intl.formatMessage({
    id: 'withdraw_modal_placeholder_details',
  });

  const placeholderAmount = intl.formatMessage({
    id: 'withdraw_modal_placeholder_amount',
  });

  const labelAmount = intl.formatMessage({ id: 'amount' });
  const labelDetails = intl.formatMessage({ id: 'details' });

  const isActive = useCallback(
    (count: number) => {
      if (active === count) {
        return 'bg-purple';
      }

      return '';
    },
    [active],
  );

  const handleSelectType = (count: number) => {
    setActive(count);
  };

  return (
    <>
      <Button onClick={handleOpen} className='bg-primary-100 text-xs px-[7px] py-0.5'>
        <FormattedMessage id='withdraw_btn' />
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit} className='min-w-[285px]'>
          <div className='text-center font-bold text-lg'>
            <FormattedMessage id='withdraw_funds' />
          </div>
          <div className='flex mt-5 justify-center'>
            <Button
              onClick={() => handleSelectType(0)}
              className={`text-xs border !rounded-none border-purple !rounded-l-xl ${isActive(
                0,
              )}`}
            >
              CARD
            </Button>
            <Button
              onClick={() => handleSelectType(1)}
              className={`text-xs border !rounded-none border-purple !rounded-r-xl ${isActive(
                1,
              )}`}
            >
              USDT
            </Button>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <div className='relative'>
              <Input
                placeholder={placeholderDetails}
                label={labelDetails}
                className={
                  formik.touched.amount && formik.errors.amount ? 'border-red' : ''
                }
                {...formik.getFieldProps('amount')}
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div className='text-red text-[10px] absolute -bottom-3'>
                  {formik.errors.amount}
                </div>
              ) : null}
            </div>

            <div className='relative'>
              <Input
                placeholder={placeholderAmount}
                label={labelAmount}
                className={
                  formik.touched.details && formik.errors.details ? 'border-red' : ''
                }
                {...formik.getFieldProps('details')}
              />
              {formik.touched.details && formik.errors.details ? (
                <div className='text-red text-[10px] absolute -bottom-3'>
                  {formik.errors.details}
                </div>
              ) : null}
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-5'>
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
        </form>
      </Modal>
    </>
  );
};

export default ModalWithdraw;
