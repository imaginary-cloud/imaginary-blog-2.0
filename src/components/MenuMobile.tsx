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
import { Sublink } from '@/common.types';

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
              const groupedSublinks = (sublinks: Sublink[]) =>
                groupSublinksByParent(sublinks);

              return (
                <>
                  {sublinks ? (
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem key={title} value={title.toUpperCase()}>
                        <AccordionTrigger>{title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-start gap-2 pt-5">
                          {sublinks && (
                            <>
                              {/* Iterate over sublinks without parent - named as default */}
                              {groupedSublinks(sublinks)['default']?.map(
                                (sublink) => (
                                  <>
                                    <a
                                      key={sublink.title}
                                      href={sublink.url}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        router.push(sublink.url);
                                      }}
                                    >
                                      {sublink.title.toUpperCase()}
                                    </a>
                                    <Separator />
                                  </>
                                )
                              )}

                              {/* Iterate over sublinks with parent */}
                              {Object.entries(groupedSublinks(sublinks))
                                .filter(([parent]) => parent !== 'default')
                                .map(([parent, links]) => (
                                  <Accordion key={parent} type="single" collapsible>
                                    <AccordionItem value={parent.toUpperCase()}>
                                      <AccordionTrigger>
                                        {parent.toUpperCase()}
                                      </AccordionTrigger>
                                      <AccordionContent className="flex flex-col justify-start">
                                        <div className="flex flex-col gap-4 px-3 pt-4">
                                          {links.map((link) => (
                                            <a
                                              key={link.title}
                                              href={link.url}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                router.push(link.url);
                                              }}
                                            >
                                              {link.title.toUpperCase()}
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
                    <>
                      <a className="py-2" href={url}>
                        {title}
                      </a>
                      <Separator />
                    </>
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
