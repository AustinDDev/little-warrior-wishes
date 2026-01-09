"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/feed", label: "Our Feed" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white/70 backdrop-blur dark:bg-zinc-900/70">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo / site name */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Our Organization
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-2 text-sm">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href ||
              (href !== "/" && pathname?.startsWith(href));

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-full px-3 py-1 transition ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
