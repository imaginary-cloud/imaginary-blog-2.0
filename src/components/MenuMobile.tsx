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
        <SheetContent className="p-5">
          <SheetHeader />
          <div className="flex flex-col gap-4 pt-5">
            {menus.map(({ title, sublinks, url }, index) => {
              const groupedSublinks = groupSublinksByParent(sublinks || []);

              return (
                <div key={index}>
                  {sublinks ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value={title}>
                        <AccordionTrigger>{title}</AccordionTrigger>
                        <AccordionContent>
                          {Object.entries(groupedSublinks).map(
                            ([parent, links], groupIndex) => (
                              <div key={groupIndex}>
                                {parent !== 'no-parent' ? (
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value={parent}>
                                      <AccordionTrigger>{parent}</AccordionTrigger>
                                      <AccordionContent>
                                        {links.map((link, linkIndex) => (
                                          <a
                                            key={linkIndex}
                                            href={link.url}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              router.push(link.url);
                                            }}
                                          >
                                            {link.title}
                                          </a>
                                        ))}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ) : (
                                  links.map((link, linkIndex) => (
                                    <a
                                      key={linkIndex}
                                      href={link.url}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        router.push(link.url);
                                      }}
                                    >
                                      {link.title}
                                    </a>
                                  ))
                                )}
                              </div>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <>
                      <a
                        href={url}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(url!);
                        }}
                      >
                        {title}
                      </a>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
