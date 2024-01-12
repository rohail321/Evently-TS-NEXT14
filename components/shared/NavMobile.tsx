import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";
export default function NavMobile() {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' className='align-middle'>
            <Image
              src='/assets/icons/menu.svg'
              width={24}
              height={24}
              className='cursor-pointer'
              alt='menu'
            />
          </Button>
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          <Image
            src={"/assets/images/logo.svg"}
            alt='logo'
            width={128}
            height={38}
          />
          <Separator className='border border-gray-50' />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
