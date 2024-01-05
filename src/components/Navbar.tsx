'use client';

import { useRouter } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useState } from 'react';
import { menus } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Button from './Button';
import Submenu from './Submenu';

export default function Navbar() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const router = useRouter();

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <NavigationMenu className="mx-auto">
      <div className="flex w-full justify-center">
        <NavigationMenuItem key="logo" className="list-none p-5">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={250} height={250} />
          </Link>
          <button
            className="text-gray-700 outline-none p-2 rounded-md lg:hidden"
            onClick={toggleMobileNav}
          >
            <Menu />
          </button>
        </NavigationMenuItem>
        <div
          className={`lg:flex lg:flex-row flex-col items-center mt-8 lg:mt-0 ${
            isMobileNavVisible ? 'block' : 'hidden'
          } `}
        >
          {menus.map(({ title, isBtn, sublinks, url }, index) => (
            <NavigationMenuItem key={index} className="list-none">
              {sublinks ? (
                <>
                  <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Submenu sublinks={sublinks} />
                  </NavigationMenuContent>
                </>
              ) : (
                <>
                  {!isBtn ? (
                    <NavigationMenuLink
                      className="text-sm font-medium px-4 py-2"
                      href={url || '#'}
                      onClick={() => router.push(url!)}
                    >
                      {title}
                    </NavigationMenuLink>
                  ) : (
                    <Button
                      text={title}
                      className="bg-blue-500 h-10 text-white p-2"
                    />
                  )}
                </>
              )}
            </NavigationMenuItem>
          ))}
        </div>
      </div>
    </NavigationMenu>
  );
}
