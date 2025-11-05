"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mainColor = '#7B6EF2';

  const navLinks = [
    { name: 'home', href: "/#home", label: "Home" },
    { name: 'feature', href: "/#feature", label: "Feature" },
    { name: 'review', href: "/#review", label: "Review" },
    { name: 'faq', href: "/#faq", label: "FAQ" },
  ];

  const ctaLinks = [
    { name: 'Pomodoro', href: '/pomodoro', isPrimary: true },
    { name: 'Download', href: "https://play.google.com/store/apps/details?id=com.doko.app", isPrimary: false },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="flex items-center space-x-2 flex-shrink-0">
             <img
              src="/logo.svg" 
              alt="DoKo Logo"
              width={28}
              height={28}
              className="h-7 w-7" 
            />
            <span className="text-xl font-bold" style={{ color: mainColor }}>
              DoKo
            </span>
          </a>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center space-x-3">
            {ctaLinks.map((cta) => (
              <a
                key={cta.name}
                href={cta.href}
                target={cta.href.startsWith('http') ? "_blank" : "_self"} 
                rel={cta.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  cta.isPrimary
                    ? 'text-white shadow-lg transform hover:scale-105'
                    : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
                style={cta.isPrimary ? { backgroundColor: mainColor } : {}}
              >
                {cta.name}
              </a>
            ))}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring-gray-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {ctaLinks.map((cta) => (
            <a
              key={cta.name}
              href={cta.href}
              target={cta.href.startsWith('http') ? "_blank" : "_self"}
              rel={cta.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium transition duration-150 mt-2 ${
                cta.isPrimary
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
              style={cta.isPrimary ? { backgroundColor: mainColor } : {}}
              onClick={() => setIsOpen(false)}
            >
              {cta.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;