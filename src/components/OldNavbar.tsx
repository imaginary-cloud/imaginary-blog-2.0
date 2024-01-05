'use client';

import { useState } from 'react';
import Link from 'next/link';
import { menus } from '@/lib/constants';
import { FaChevronDown } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export default function OldNavbar() {
  const [show, setShow] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleOpenSubMenu = (title: string) => {
    setOpenSubMenu((prev) => (prev === title ? null : title));
  };

  return (
    <nav className="">
      <div className="flex w-full justify-between gap-10">
        <div className="flex justify-between items-center mt-8 md:py-5">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={250} height={250} />
          </Link>
          <Menu
            className="text-gray-700 outline-none p-2 rounded-md md:hidden"
            onClick={() => setShow(!show)}
          />
        </div>
        <ul className="flex justify-between items-center mt-8 w-full">
          {menus.map((menu, index) => (
            <li key={index} className="">
              {menu.sublinks ? (
                <span
                  onClick={() => handleOpenSubMenu(menu.title)}
                  className="inline-flex items-center"
                >
                  {menu.title}
                  <FaChevronDown className="h-2 w-2 ml-1" />
                </span>
              ) : (
                <Link href={menu.url!}>{menu.title}</Link>
              )}
              {menu.sublinks && openSubMenu === menu.title && (
                <div className="absolute left-0 w-screen bg-gray-500 py-10 z-10">
                  {menu.sublinks.map((sublink, subIndex) => (
                    <li key={subIndex} className="px-10">
                      <Link href={sublink.url}>{sublink.title}</Link>
                    </li>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
