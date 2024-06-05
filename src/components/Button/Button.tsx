import { FC } from 'react';

import { IButton } from './Button.interface';

const Button: FC<IButton> = ({
  className = '',
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-[10px] p-2 rounded-xl text-white ${className}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
