"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Feed", href: "/feed" },
    { name: "Donate", href: "/donate" },
    { name: "Contact", href: "/contact" },
  ];

  // Move focus into menu when opened
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a");
      (firstLink as HTMLElement)?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full flex items-center justify-between px-4 sm:px-8 h-14">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-extrabold text-[#47549e] tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Little Warrior Wishes
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex space-x-6 text-sm font-medium"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[#82b0d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                pathname === link.href
                  ? "text-[#47549e]"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Main menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <nav
            className="flex flex-col space-y-3 p-4 text-gray-700"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition hover:text-[#82b0d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  pathname === link.href ? "text-[#47549e]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
