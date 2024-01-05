import { useRouter } from 'next/navigation';
import { menus } from '@/lib/constants';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { groupByParent } from '@/lib/utils';

export default function MenuMobile() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          {menus.map(({ title, isBtn, sublinks, url }, index) => (
            <>
              {sublinks ? (
                <Accordion type="single" collapsible className="mt-5" key={index}>
                  <AccordionItem value={title}>
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent className="flex flex-col flex-start">
                      <>
                        {groupByParent(sublinks).map(([parent, links], idx) => (
                          <>
                            {parent ? (
                              <Accordion type="single" collapsible key={idx}>
                                <AccordionItem key={parent} value={parent}>
                                  <AccordionTrigger>{parent}</AccordionTrigger>
                                  {links.map(({ title, url }) => (
                                    <AccordionContent key={title}>
                                      <a key={idx} href={url}>
                                        {title}
                                      </a>
                                    </AccordionContent>
                                  ))}
                                </AccordionItem>
                              </Accordion>
                            ) : (
                              <a key={idx} href={url}>
                                {title}
                              </a>
                            )}
                          </>
                        ))}
                      </>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <p key={index}>{title}</p>
              )}
              {/* {sublinks && (
                <>
                  {groupByParent(sublinks).map(([parent, links], idx) => (
                    <>
                      {parent ? (
                        <Accordion type="single" collapsible key={idx}>
                          <AccordionItem key={title} value={title}>
                            <AccordionTrigger>{title}</AccordionTrigger>
                            {links.map((link) => (
                              <AccordionContent key={link.title}>
                                <a key={idx} href={link.url}>
                                  {link.title}
                                </a>
                              </AccordionContent>
                            ))}
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <a key={idx} href={url}>
                          {title}
                        </a>
                      )}
                    </>
                  ))}
                </>
              )}
              {!sublinks && <p key={index}>{title}</p>} */}
            </>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}
