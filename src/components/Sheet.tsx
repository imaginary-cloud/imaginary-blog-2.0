import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { ChevronRight, Menu as MenuIcon } from 'lucide-react';

type SheetProps = {
  children: JSX.Element;
  title?: string;
};

export default function CustomSheet({ children, title }: SheetProps) {
  return (
    <Sheet>
      <SheetTrigger className="flex">
        {title ? (
          <div className="flex flex-col justify-start items-start w-full">
            <span className="inline-flex justify-between w-full pb-3">
              {title}
              <ChevronRight className="w-4 h-4" />
            </span>
            <Separator />
          </div>
        ) : (
          <MenuIcon />
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader />
        <div className="flex flex-col gap-4 pt-10">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
