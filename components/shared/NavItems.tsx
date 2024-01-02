"use client";
import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
type HeaderObj = { label: string; route: string };
const headerLinks: HeaderObj[] = [
  {
    label: "Home",
    route: "/",
  },
  { label: "Create Event", route: "/events/create" },
  { label: "My Profile", route: "/profile" },
];

export default function NavItems() {
  const pathname = usePathname();
  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row '>
      {headerLinks.map((val) => {
        const isActive = pathname === val.route;
        return (
          <li
            key={val.route}
            className={`${
              isActive && `text-primary-500`
            } flex-center p-medium-16 whitespace-nowrap `}
          >
            <Link href={val.route}> {val.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
