
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "All Meetings" },
  { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap gap-4">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href === "/meetings" &&
            pathname.startsWith("/meetings/") &&
            pathname !== "/meetings/current");

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              active
                ? "bg-blue-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
