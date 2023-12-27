import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert the string to lowercase and replace spaces with hyphens
export const convertString = (str: string) => {
  const lowercaseString = str.toLowerCase();
  const resultString = lowercaseString.replace(/\s+/g, '-');

  return resultString;
};
export const truncateString = (inputString: string) => {
  // Split the input string into an array of words
  const words = inputString.split(/\s+/);

  // Check if the number of words is less than or equal to the specified maximum
  if (words.length <= 20) {
    return inputString;
  }

  // Join the first 20 words and add the ellipsis
  const truncatedString = words.slice(0, 20).join(' ') + '...';
  return truncatedString;
};
