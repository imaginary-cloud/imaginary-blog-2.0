import { useRouter } from 'next/navigation';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { menus } from '@/lib/constants';
import SubmenuDesktop from './SubmenuDesktop';
import Button from './Button';

export default function MenuDesktop() {
  const router = useRouter();

  if (!menus) return;

  return (
    <div className="hidden lg:flex lg:flex-row items-center mt-8 lg:mt-0">
      {menus.map(({ title, isBtn, sublinks, url }, index) => (
        <NavigationMenuItem key={index} className="list-none">
          {sublinks ? (
            <>
              <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-background">
                <SubmenuDesktop sublinks={sublinks} />
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
                <Button text={title} className="bg-blue-500 h-10 text-white p-2" />
              )}
            </>
          )}
        </NavigationMenuItem>
      ))}
    </div>
  );
}
