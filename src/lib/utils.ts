import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertString = (str: string) => {
  // Convert the string to lowercase
  const lowercaseString = str.toLowerCase();

  // Replace spaces with hyphens
  const resultString = lowercaseString.replace(/\s+/g, '-');

  return resultString;
};
