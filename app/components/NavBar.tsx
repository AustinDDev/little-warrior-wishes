"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#47549e] flex items-center gap-2">
          🦋 Little Warrior Wishes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-[#82b0d5]">Home</Link>
          <Link href="/about" className="hover:text-[#82b0d5]">About</Link>
          <Link href="/events" className="hover:text-[#82b0d5]">Events</Link>
          <Link href="/donate" className="hover:text-[#82b0d5]">Donate</Link>
          <Link href="/blog" className="hover:text-[#82b0d5]">Blog</Link>
          <Link href="/contact" className="hover:text-[#82b0d5]">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#47549e] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-3 px-6">
          <Link href="/" className="block hover:text-[#82b0d5]">Home</Link>
          <Link href="/about" className="block hover:text-[#82b0d5]">About</Link>
          <Link href="/events" className="block hover:text-[#82b0d5]">Events</Link>
          <Link href="/donate" className="block hover:text-[#82b0d5]">Donate</Link>
          <Link href="/blog" className="block hover:text-[#82b0d5]">Blog</Link>
          <Link href="/contact" className="block hover:text-[#82b0d5]">Contact</Link>
        </div>
      )}
    </nav>
  );
}
