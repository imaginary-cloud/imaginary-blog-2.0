// src/components/SubmenuDesktop.tsx

import { useRouter } from 'next/navigation';
import { NavigationMenuLink } from './ui/navigation-menu';
import { Sublink } from '@/common.types'; // Import Sublink type from utils
import { groupSublinksByParent } from '@/lib/utils';
import { Separator } from './ui/separator';

type SubmenuProps = {
  sublinks: Sublink[];
};

export default function SubmenuDesktop({ sublinks }: SubmenuProps) {
  const router = useRouter();
  const groupedSublinks = groupSublinksByParent(sublinks);

  return (
    <div className="flex justify-between align-start h-fit w-[40%] md:w-[60%] p-5 mx-auto">
      {Object.entries(groupedSublinks).map(([parent, links]) => (
        <div key={parent}>
          {parent !== 'no-parent' && (
            <>
              <p className="font-bold text-gray-700 pb-2">{parent}</p>
              <Separator className="mb-4" />
            </>
          )}
          <ul className="list-none">
            {links.map((link, subIndex) => (
              <li key={subIndex} className="pb-3">
                <NavigationMenuLink
                  href={link.url}
                  onClick={() => router.push(link.url)}
                >
                  {link.title}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
