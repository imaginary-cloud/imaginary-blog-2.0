import { NavigationMenuLink } from './ui/navigation-menu';
import { SubmenuProps } from '@/common.types';
import { groupSublinksByParent } from '@/lib/utils';
import { Separator } from './ui/separator';

export default function SubmenuDesktop({ sublinks }: SubmenuProps) {
  const groupedSublinks = groupSublinksByParent(sublinks);

  return (
    <div className="flex justify-between align-start h-fit w-[60%] lg:w-[40%] p-5 mx-auto">
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
                <NavigationMenuLink href={link.url}>{link.title}</NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
