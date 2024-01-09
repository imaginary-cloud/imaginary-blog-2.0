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
import { Separator } from './ui/separator';

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
                        <AccordionContent className="flex flex-col justify-start gap-2 pt-5 pl-3">
                          {Object.entries(groupedSublinks).map(
                            ([parent, links], groupIndex) => (
                              <div key={groupIndex}>
                                {parent !== 'no-parent' ? (
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value={parent}>
                                      <AccordionTrigger>{parent}</AccordionTrigger>
                                      <AccordionContent className="flex flex-col justify-start gap-3 px-3 pt-4">
                                        <>
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
                                        </>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ) : (
                                  <div className="flex flex-col gap-3">
                                    <>
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
                                    </>
                                  </div>
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
                        className="flex flex-col gap-4 py-2"
                        href={url}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(url!);
                        }}
                      >
                        {title}
                      </a>
                      <Separator />
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
