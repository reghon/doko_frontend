"use client";

import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {
  return (
    <section id="home" className="">
      <div className="relative py-25 bg-gradient-to-b from-transparent via-transparent to-[#7B6EF24D]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4">
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">Work Smart</h1>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">Not Hard</h1>
            <h1 className="text-6xl font-bold text-[#7B6EF2]">with DoKo</h1>
            <p className="mt-3 text-2xl text-gray-600">
              Transform your productivity with intelligent <br /> task management, seamless collaboration, <br /> and intuitive calendar integration.
            </p>
            <Link
              href="https://play.google.com/store/apps/details?id=com.doko.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download DoKo on Google Play"
            >
              <Image
                src="/playstore.png"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="mt-6"
              />
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src="/heroLogo.svg" alt="Hero Illustration" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
