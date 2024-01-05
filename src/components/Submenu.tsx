import { useRouter } from 'next/navigation';
import { NavigationMenuLink } from './ui/navigation-menu';

type SubmenuProps = {
  sublinks: Sublink[] | undefined;
};

export default function Submenu({ sublinks }: SubmenuProps) {
  const router = useRouter();

  if (!sublinks) return null;

  const columns: Record<string, Sublink[]> = {};

  sublinks.forEach((sublink) => {
    const parent = sublink.parent || 'default';
    if (!columns[parent]) {
      columns[parent] = [];
    }
    columns[parent].push(sublink);
  });

  return (
    <div className="flex justify-between h-fit w-[80%] p-5 mx-auto">
      {Object.entries(columns).map(([parent, links]) => (
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
