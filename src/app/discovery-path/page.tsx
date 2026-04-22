"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SinkOrFloat } from '@/components/SinkOrFloat';
import { SeedToFlower } from '@/components/SeedToFlower';
import { MixTheColors } from '@/components/MixTheColors';
import { Footer } from '@/components/Footer';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DiscoveryPathPage() {
  const [activeGames, setActiveGames] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/rk/settings');
        const data = await res.json();
        if (data.activeGames) {
          setActiveGames(data.activeGames);
        }
      } catch (e) {
        console.error("Failed to fetch settings", e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <main className="min-h-screen bg-sky-50 font-sans selection:bg-sky-200">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-400 text-white shadow-xl">
            <Compass className="h-12 w-12" />
          </div>
          <h1 className="mb-6 text-6xl font-black text-slate-800">Discovery Path</h1>
          <p className="mx-auto max-w-2xl text-2xl font-bold text-slate-600">
            Explore nature and science through interactive experiments. What will you discover today?
          </p>
        </motion.div>

        {activeGames['SinkOrFloat'] !== false && <SinkOrFloat />}
        {activeGames['SeedToFlower'] !== false && <SeedToFlower />}
        {activeGames['MixTheColors'] !== false && <MixTheColors />}
      </div>

      <Footer />
    </main>
  );
}
