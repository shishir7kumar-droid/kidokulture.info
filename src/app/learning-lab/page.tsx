"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { GraduationCap } from 'lucide-react';
import { ShadowMatch } from '@/components/ShadowMatch';
import { HungryCaterpillar } from '@/components/HungryCaterpillar';
import { LetterTrace } from '@/components/LetterTrace';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function LearningLabPage() {
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
    <main className="min-h-screen bg-emerald-50 font-sans selection:bg-emerald-200">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-400 text-white shadow-xl">
            <GraduationCap className="h-12 w-12" />
          </div>
          <h1 className="mb-6 text-6xl font-black text-slate-800">Learning Lab</h1>
          <p className="mx-auto max-w-2xl text-2xl font-bold text-slate-600">
            Educational quests across science, math, and history. Let's learn together!
          </p>
        </motion.div>

        {activeGames['ShadowMatch'] !== false && <ShadowMatch />}
        {activeGames['HungryCaterpillar'] !== false && <HungryCaterpillar />}
        {activeGames['LetterTrace'] !== false && <LetterTrace />}
      </div>

      <Footer />
    </main>
  );
}
