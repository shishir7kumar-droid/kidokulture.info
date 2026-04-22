"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, GraduationCap, Compass } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 to-white px-4 pt-32 text-center">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-50 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 max-w-5xl"
      >

        
        <h1 className="mb-8 text-6xl font-black tracking-tight text-slate-800 md:text-8xl leading-[1.1]">
          Where <span className="text-orange-400 italic">Curiosity</span> <br />
          Meets <span className="text-sky-600 underline decoration-sky-200 underline-offset-8">Magic</span>
        </h1>
        
        <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl font-bold text-slate-600 leading-relaxed">
          KidoKulture is a safe, interactive universe designed to spark wonder, 
          encourage exploration, and celebrate the joy of learning through play.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Link href="#explore">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(251 146 60 / 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-orange-400 px-12 py-6 text-2xl font-black text-white shadow-xl shadow-orange-100 hover:bg-orange-500 transition-all uppercase tracking-wider"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Floating elements representing our worlds */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                 <PlayCircle size={24} />
              </div>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500">
                 <GraduationCap size={24} />
              </div>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-500">
                 <Compass size={24} />
              </div>
           </div>
        </div>
      </motion.div>

      {/* Ground line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-sky-400 to-emerald-400" />
    </section>
  );
};
