'use client';

import Link from 'next/link';
import Image from 'next/image';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { menus } from '@/lib/constants';

export default function Header() {
  const [state, setState] = React.useState(false);

  return (
    <header className="py-4 bg-white">
      <nav className="h-full max-w-[1150px] justify-between items-center mx-auto flex">
        <div className="items-center px-4 w-full mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Image src="logo.svg" alt="Logo" width={250} height={250} />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                <Menu />
              </button>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? 'block' : 'hidden'
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map(({ path, title }, index) => (
                <li key={index} className="text-gray-600 hover:text-blue-500">
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
