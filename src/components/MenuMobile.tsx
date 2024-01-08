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
import { groupSublinksByParent } from '@/lib/utils';

export default function MenuMobile() {
  const router = useRouter();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader />
          <div className="flex flex-col gap-4 mt-10 px-0">
            {menus.map(({ title, sublinks, url }, index) => {
              const groupedSublinks = (sublinks: any) =>
                groupSublinksByParent(sublinks);
              return (
                <>
                  {sublinks ? (
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem key={title} value={title}>
                        <AccordionTrigger>{title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-start gap-3">
                          {sublinks && (
                            <>
                              {groupedSublinks(sublinks)['default']?.map(
                                (sublink) => (
                                  <a
                                    key={sublink.title}
                                    href={sublink.url}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      router.push(sublink.url);
                                    }}
                                  >
                                    {sublink.title}
                                  </a>
                                )
                              )}

                              {Object.entries(groupedSublinks(sublinks))
                                .filter(([parent]) => parent !== 'default')
                                .map(([parent, links]) => (
                                  <Accordion key={parent} type="single" collapsible>
                                    <AccordionItem value={parent}>
                                      <AccordionTrigger>{parent}</AccordionTrigger>
                                      <AccordionContent className="flex flex-col justify-start gap-2">
                                        <div className="flex flex-col mt-3 gap-2">
                                          {links.map((link) => (
                                            <a
                                              key={link.title}
                                              href={link.url}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                router.push(link.url);
                                              }}
                                            >
                                              {link.title}
                                            </a>
                                          ))}
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ))}
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <a>{title}</a>
                  )}
                </>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
