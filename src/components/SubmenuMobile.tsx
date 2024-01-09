import { useCallback, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { SubmenuProps } from '@/common.types';
import { groupSublinksByParent } from '@/lib/utils';

export default function SubmenuMobile({ sublinks }: SubmenuProps) {
  const router = useRouter();
  const groupedSublinks = groupSublinksByParent(sublinks || []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>, url: string) => {
      e.preventDefault();
      router.push(url);
    },
    [router]
  );

  return (
    <>
      {Object.entries(groupedSublinks).map(([parent, links]) => (
        <>
          {parent !== 'no-parent' ? (
            <Accordion type="single" collapsible>
              <AccordionItem value={parent}>
                <AccordionTrigger>{parent.toUpperCase()}</AccordionTrigger>
                <AccordionContent className="flex flex-col justify-start gap-3 px-3 pt-4">
                  <>
                    {links.map(({ url, title }) => (
                      <a
                        className="text-gray"
                        key={title}
                        href={url}
                        onClick={(e) => handleClick(e, url)}
                      >
                        {title.toUpperCase()}
                      </a>
                    ))}
                  </>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="flex flex-col gap-3">
              {links.map(({ url, title }) => (
                <a key={title} href={url} onClick={(e) => handleClick(e, url)}>
                  {title.toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </>
      ))}
    </>
  );
}
