import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Copyright */}
          <div className="text-black text-sm text-center">
            <p>Copyright &copy; 2025 DoKo. Powered by AgileTeknik. All Rights Reserved.</p>
          </div>

          {/* Logos */}
          <div className="flex flex-col md:flex-row items-center justify-center space-x-6">
            {/* Logo DoKo */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/logo.svg"
                alt="DoKo Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-[#7B6EF2]">DoKo</span>
            </div>

            {/* Logo PENS */}
            <Image
              src="/pens_logo.svg"
              alt="PENS Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
