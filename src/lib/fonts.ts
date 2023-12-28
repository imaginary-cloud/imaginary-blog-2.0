import { Lato, Merriweather } from 'next/font/google';

// Load fonts
const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  style: ['normal'],
  variable: '--font-latin',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '700'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
});

export { lato, merriweather };
