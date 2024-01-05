'use client';

import Link from 'next/link';
import Image from 'next/image';

import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu';
import MenuDesktop from '@/components/MenuDesktop';
import MenuMobile from './MenuMobile';

export default function Navbar() {
  return (
    <NavigationMenu className="mx-auto">
      <div className="flex w-full justify-center">
        <NavigationMenuItem key="logo" className="list-none p-5">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={250} height={250} />
          </Link>
        </NavigationMenuItem>
        <MenuDesktop />
        <MenuMobile />
      </div>
    </NavigationMenu>
  );
}
