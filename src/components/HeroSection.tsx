"use client";

import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {
  const mainColor = '#7B6EF2';

  return (
    <section id="home" className="bg-white">
      <div className="relative py-24 bg-gradient-to-b from-transparent via-transparent to-[#7B6EF24D] px-4">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl lg: text-7xl font-extrabold text-gray-900 mb-2 leading-tight">Work Smart</h1>
            <h1 className="text-5xl sm:text-6xl lg: text-7xl font-extrabold text-gray-900 mb-2 leading-tight">Not Hard</h1>
            <h1 className="text-5xl sm:text-6xl lg: text-7xl font-extrabold" style={{ color: mainColor }}>with DoKo</h1>
            <p className="mt-3 text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Transform your productivity with intelligent <br /> task management, seamless collaboration, <br /> and intuitive calendar integration.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.doko.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download DoKo on Google Play"
              >
                <img src="/playstore.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="mt-6 h-12 w-40"
                />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-10 md:mt-0">
            <img
              src="/heroLogo.svg"
              alt="Hero Illustration"
              className="max-w-full h-auto w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
