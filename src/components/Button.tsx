'use client';

import { MouseEventHandler } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  rightIcon?: JSX.Element;
};

export default function Button({
  text,
  disabled,
  onClick,
  className,
  type,
}: ButtonProps) {
  const style = !type ? `${className}` : className;

  return (
    <button
      className={style}
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
    >
      {text}
    </button>
  );
}
