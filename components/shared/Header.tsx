import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import NavMobile from "./NavMobile";
function Header() {
  return (
    <header className='flex flex-row w-full border-b'>
      <div className='flex flex-row  wrapper'>
        <Link href='/' className='w-36'>
          <Image
            src='/assets/images/logo.svg'
            width={128}
            height={38}
            alt='Evently logo'
          />
        </Link>
        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <NavItems />
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <NavMobile />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full' size={"lg"}>
              <Link href={"sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header;
