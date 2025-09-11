"use client";

import Link from "next/link";
import Image from "next/image";

const middleNav = [
  { href: "#home", label: "Home" },
  { href: "#feature", label: "Feature" },
  { href: "#review", label: "Review" },
  { href: "#faq", label: "FAQ" },
];

const rightNav = { href: "#download", label: "Download" };

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
       
        <Link href="#home" className="flex items-center space-x-2">
          <Image
            src="logo.svg" 
            alt="DoKo Logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-xl font-bold text-[#7B6EF2]">DoKo</span>
        </Link>

        <ul className="hidden md:flex items-center gap-14">
          {middleNav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={rightNav.href} className="text-sm font-medium text-gray-700 hover:text-gray-900">
          {rightNav.label}
        </a>
      </nav>
    </header>
  );
}
