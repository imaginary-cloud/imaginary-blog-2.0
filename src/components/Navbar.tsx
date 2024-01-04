'use client';

import { useRouter } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Fragment } from 'react';
import { menus } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();

  return (
    <NavigationMenu className="flex w-full mx-auto">
      <div className="flex justify-between items-center w-full">
        <NavigationMenuItem key="logo" className="list-none p-5">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={250} height={250} />
          </Link>
        </NavigationMenuItem>
        {menus.map((menu, index) => (
          <NavigationMenuItem key={index} className="list-none">
            {menu.sublinks ? (
              <Fragment>
                <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {menu.sublinks.map((sublink, subIndex) => (
                    <NavigationMenuLink
                      href={sublink.url}
                      onClick={() => router.push(sublink.url)}
                      key={subIndex}
                    >
                      {sublink.title}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </Fragment>
            ) : (
              <NavigationMenuLink
                className="text-sm font-medium px-4 py-2"
                href={menu.url}
                onClick={() => router.push(menu.url!)}
              >
                {menu.title}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </div>
    </NavigationMenu>
  );
}
