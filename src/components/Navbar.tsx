"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderInstallButton } from './HeaderInstallButton';

export const Navbar = () => {
  const navLinks = [
    { name: 'Play Zone', href: '/' },
    { name: 'Learning Lab', href: '/learning-lab' },
    { name: 'Discovery Path', href: '/discovery-path' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[95%] lg:w-[90%] -translate-x-1/2 rounded-full border border-white/20 bg-white/80 px-4 md:px-8 py-3 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="https://res.cloudinary.com/dvgv5h1u1/image/upload/v1775139446/kklogo_cwnhlq.png" 
              alt="KidoKulture Logo" 
              width={150} 
              height={52}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        
        {/* Center: Nav Links (Hidden on small mobile) */}
        <div className="hidden sm:flex space-x-4 md:space-x-8 justify-center items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-sm md:text-lg font-black text-slate-600 transition-colors hover:text-sky-500"
              >
                {link.name}
              </motion.span>
              <span className="absolute -bottom-1 left-0 h-1 w-0 bg-orange-400 transition-all group-hover:w-full rounded-full" />
            </Link>
          ))}
        </div>

        {/* Right: Install Button */}
        <div className="flex items-center">
          <HeaderInstallButton />
        </div>
      </div>
    </nav>
  );
};
