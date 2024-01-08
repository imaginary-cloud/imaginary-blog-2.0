import { useRouter } from 'next/navigation';
import { NavigationMenuLink } from './ui/navigation-menu';
import { Sublink, SubmenuProps } from '@/common.types';
import { groupSublinksByParent } from '@/lib/utils';

export default function SubmenuDesktop({ sublinks }: SubmenuProps) {
  const router = useRouter();

  if (!sublinks) return null;

  // Group sublinks by their parent
  const groupedSublinks = groupSublinksByParent(sublinks);

  return (
    <div className="flex justify-between h-fit w-[40%] md:w-[60%] p-5 mx-auto">
      {Object.entries(groupedSublinks).map(([parent, links]) => (
        <div key={parent} className="">
          {parent !== 'default' && (
            <p className="font-bold text-gray-700 mb-2">{parent}</p>
          )}
          <ul className="list-none">
            {links.map((link, subIndex) => (
              <li key={subIndex}>
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
