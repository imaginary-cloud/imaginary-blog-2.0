'use client';

import Link from 'next/link';
import Image from 'next/image';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { menus } from '@/lib/constants';
import Button from '@/components/Button';

export default function Header() {
  const [state, setState] = React.useState(false);

  return (
    <header className="py-4 bg-white">
      <nav className="h-full max-w-[1150px] justify-between items-center mx-auto flex">
        <div className="flex justify-between items-center px-4 w-full mx-auto md:flex md:px-8">
          <div className=" py-3 md:py-5 md:block">
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
            className={`items-center space-between ${!state ? 'flex' : 'hidden'}`}
          >
            <ul className="pace-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map(({ path, title }, index) => (
                <li key={index} className="text-gray-600 hover:text-blue-500">
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
            <Button
              text="CONTACT US"
              className="bg-blue-500 text-white px-4 py-2 ml-10"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
