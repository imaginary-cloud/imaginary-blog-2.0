'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { menus } from '@/lib/constants';
import Button from '@/components/Button';

export default function Header() {
  const [show, setShow] = useState(true);

  return (
    <header className="h-full max-w-[1150px] mx-auto">
      <nav className="md:flex w-full mx-auto px-5">
        <div className="md:flex justify-between items-center w-full">
          <div className="flex justify-between items-center py-3 md:py-5">
            <Link href="/">
              <Image src="logo.svg" alt="Logo" width={250} height={250} />
            </Link>
            <button
              className="text-gray-700 outline-none p-2 rounded-md md:hidden"
              onClick={() => setShow(!show)}
            >
              <Menu />
            </button>
          </div>
          <div
            className={`md:flex items-center justify-between mt-8 md:mt-0 ${
              show ? 'block' : 'hidden'
            } `}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Button text="CONTACT US" className="bg-blue-500 h-10 text-white p-2" />
        </div>
      </nav>
    </header>
  );
}
