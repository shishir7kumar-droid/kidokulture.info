"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-100 px-4 pt-32 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="container relative z-10"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mx-auto mb-8 inline-block rounded-3xl bg-emerald-100 p-6 shadow-sm"
        >
          <Sparkles className="h-16 w-16 text-emerald-600" />
        </motion.div>
        
        <h1 className="mb-6 text-6xl font-black tracking-tight text-slate-800 md:text-8xl">
          Welcome to <span className="text-orange-400">Kido</span><span className="text-sky-600">Kulture</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-3xl text-xl font-bold text-slate-600 md:text-2xl">
          explore learn grow and have fun..
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-3xl bg-orange-400 px-10 py-5 text-2xl font-black text-white shadow-xl shadow-orange-200 transition-colors hover:bg-orange-500"
          >
            Get Started
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-3xl bg-white px-10 py-5 text-2xl font-black text-sky-600 shadow-xl shadow-sky-200 transition-colors hover:bg-slate-50"
          >
            View Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-emerald-100 opacity-40 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl"
      />
    </section>
  );
};
