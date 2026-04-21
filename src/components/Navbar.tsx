"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  const navLinks = [
    { name: 'Play', href: '#' },
    { name: 'Learn', href: '#' },
    { name: 'Discover', href: '#' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-full border border-white/20 bg-white/70 px-8 py-4 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-sky-600">
          Kido<span className="text-orange-400">Kulture</span>
        </Link>
        
        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-bold text-slate-600 transition-colors hover:text-sky-500"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-orange-400 px-6 py-2 font-bold text-white shadow-md hover:bg-orange-500 transition-colors"
        >
          Join Fun
        </motion.button>
      </div>
    </nav>
  );
};
