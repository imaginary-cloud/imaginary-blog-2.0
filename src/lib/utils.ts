import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { months } from './constants';
import { Sublink } from '@/common.types';

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

export const convertDate = (date: string) => {
  const res = new Date(date);

  return `${months[res.getMonth()]} ${res.getDay()}, ${res.getFullYear()}`;
};

export const groupByParent = (sublinks: Sublink[]) => {
  const columns: Record<string, Sublink[]> = {};

  sublinks.forEach((sublink) => {
    const parent = sublink.parent;
    if (!columns[parent!]) {
      columns[parent!] = [];
    }
    columns[parent!].push(sublink);
  });

  return Object.entries(columns);
};

// Define a type for the grouped sublinks object
type GroupedSublinks = {
  [parent: string]: Sublink[];
};

// Function to group sublinks by parent
export const groupSublinksByParent = (sublinks: Sublink[]) => {
  const grouped = sublinks.reduce<GroupedSublinks>((acc, sublink) => {
    // Use 'default' as a key for sublinks without a parent
    const key = sublink.parent || 'default';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(sublink);
    return acc;
  }, {});

  console.log(grouped);

  return grouped;
};
