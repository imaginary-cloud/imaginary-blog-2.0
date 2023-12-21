'use client';

import { MouseEventHandler } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  icon?: JSX.Element;
};

export default function Button({
  text,
  disabled,
  onClick,
  className,
  type,
  icon,
}: ButtonProps) {
  const style = !type ? `${className}` : className;

  return (
    <button
      className={style}
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
    >
      {text && text}
      {icon && icon}
    </button>
  );
}
