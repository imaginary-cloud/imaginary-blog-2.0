import { MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { menus } from '@/lib/constants';
import { Separator } from './ui/separator';
import SubmenuMobile from './SubmenuMobile';
import CustomSheet from './Sheet';

export default function MenuMobile() {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>, url: string) => {
      e.preventDefault();
      router.push(url);
    },
    [router]
  );

  // filter only the services menu links in order to open a new sheet
  const services = menus.filter(({ title }) => title.toUpperCase() === 'SERVICES');

  return (
    <div className="lg:hidden">
      <CustomSheet>
        <>
          {menus.map(({ title, sublinks, url }) => (
            <>
              {sublinks ? (
                <>
                  {title.toUpperCase() === 'SERVICES' ? (
                    <CustomSheet title={title}>
                      <>
                        {services.map(({ sublinks }) => (
                          <SubmenuMobile sublinks={sublinks!} key={title} />
                        ))}
                      </>
                    </CustomSheet>
                  ) : (
                    <Accordion type="single" collapsible>
                      <AccordionItem value={title}>
                        <AccordionTrigger>{title.toUpperCase()}</AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-start gap-2 pt-5 pl-3">
                          <SubmenuMobile sublinks={sublinks} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </>
              ) : (
                <>
                  <a
                    className="flex flex-col gap-4 py-2"
                    href={url}
                    onClick={(e) => handleClick(e, url!)}
                  >
                    {title.toUpperCase()}
                  </a>
                  <Separator />
                </>
              )}
            </>
          ))}
        </>
      </CustomSheet>
    </div>
  );
}
