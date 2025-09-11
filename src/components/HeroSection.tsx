"use client";

export default function HeroSection() {
  return (
    <section id="home" className="py-24">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4">
        {/* LEFT */}
        <div>
          <h1 className="text-6xl font-bold text-gray-900">Work Smart <br /> Not Hard</h1>
          <h1 className="text-6xl font-bold text-[#7B6EF2]">with DoKo</h1>
          <p className="mt-3 text-2xl text-gray-600">
            Transform your productivity with intelligent <br /> task management, seamless collaboration, <br /> and intuitive calendar integration.
          </p>
          <img src="/playStore.svg" alt="Download on Play Store" width={160} height={48} className="mt-6" />
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <img src="/heroLogo.svg" alt="Hero Illustration" className="max-w-full h-auto" />
        </div>
      </div>
      
      <div className="absolute bottom-30 left-0 right-0 h-100 bg-gradient-to-b from-transparent to-[#7B6EF24D] pointer-events-none"></div>
    </section>
    
  );
}
