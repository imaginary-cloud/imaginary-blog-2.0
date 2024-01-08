import { useRouter } from 'next/navigation';
import { Menu as MenuIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
          {menus.map(({ title, sublinks, url }, index) => {
            const groupedSublinks = (sublinks: any) =>
              groupSublinksByParent(sublinks);
            return (
              <>
                {sublinks ? (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem key={title} value={title}>
                      <AccordionTrigger>{title}</AccordionTrigger>
                      <AccordionContent>
                        {sublinks && (
                          <>
                            {groupedSublinks(sublinks)['default']?.map((sublink) => (
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
                            ))}

                            {Object.entries(groupedSublinks(sublinks))
                              .filter(([parent]) => parent !== 'default')
                              .map(([parent, links]) => (
                                <Accordion key={parent} type="single" collapsible>
                                  <AccordionItem value={parent}>
                                    <AccordionTrigger>{parent}</AccordionTrigger>
                                    <AccordionContent>
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
