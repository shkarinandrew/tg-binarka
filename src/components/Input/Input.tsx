import { FC } from 'react';

import { IInput } from './Input.interface';

const Input: FC<IInput> = ({
  className = '',
  labelClassName = '',
  id,
  label,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label className={`text-[10px] text-purple ${labelClassName}`} htmlFor={id}>
          {label}:
        </label>
      )}
      <input
        id={id}
        type='text'
        className={`w-full px-2 py-1 text-xs outline-none border-2 border-purple rounded-md bg-black ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
