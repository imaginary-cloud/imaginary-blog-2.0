import { MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu as MenuIcon } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { menus } from '@/lib/constants';
import { Separator } from './ui/separator';
import SubmenuMobile from './SubmenuMobile';

export default function MenuMobile() {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>, url: string) => {
      e.preventDefault();
      router.push(url);
    },
    [router]
  );

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="p-5">
          <SheetHeader />
          <div className="flex flex-col gap-4 pt-5">
            {menus.map(({ title, sublinks, url }) => (
              <>
                {sublinks ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={title}>
                      <AccordionTrigger>{title}</AccordionTrigger>
                      <AccordionContent className="flex flex-col justify-start gap-2 pt-5 pl-3">
                        <SubmenuMobile sublinks={sublinks} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <>
                    <a
                      className="flex flex-col gap-4 py-2"
                      href={url}
                      onClick={(e) => handleClick(e, url!)}
                    >
                      {title}
                    </a>
                    <Separator />
                  </>
                )}
              </>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
