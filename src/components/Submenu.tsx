import { useRouter } from 'next/navigation';
import { NavigationMenuLink } from './ui/navigation-menu';
import { Sublink } from '@/common.types';
import { groupByParent } from '@/lib/utils';

type SubmenuProps = {
  sublinks: Sublink[];
};

export default function Submenu({ sublinks }: SubmenuProps) {
  const router = useRouter();

  if (!sublinks) return null;

  return (
    <div className="flex justify-between h-fit w-[80%] p-5 mx-auto">
      {groupByParent(sublinks).map(([parent, links]) => (
        <div key={parent} className="">
          {parent && <p className="font-bold text-gray-700 mb-2">{parent}</p>}
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
