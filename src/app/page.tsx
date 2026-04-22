"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { InteractiveCard } from '@/components/InteractiveCard';
import { ColoringSuite } from '@/components/ColoringSuite';
import { SoundExplorer } from '@/components/SoundExplorer';
import { BubblePopMath } from '@/components/BubblePopMath';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { PlayCircle, GraduationCap, Compass } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
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

  const worlds = [
    {
      title: 'Play Zone',
      description: 'Engaging games that build coordination and strategy.',
      color: 'bg-orange-400',
      icon: <PlayCircle className="h-12 w-12" />,
      href: '#play-zone'
    },
    {
      title: 'Learning Lab',
      description: 'Educational quests across science, math, and history.',
      color: 'bg-emerald-400',
      icon: <GraduationCap className="h-12 w-12" />,
      href: '/learning-lab'
    },
    {
      title: 'Discovery Path',
      description: 'Explore nature and science through interactive experiments.',
      color: 'bg-sky-400',
      icon: <Compass className="h-12 w-12" />,
      href: '/discovery-path'
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-orange-200">
      <Navbar />
      
      {/* 1. HERO SECTION: Explore Our Worlds */}
      <section className="relative pt-32 pb-24 px-4 bg-gradient-to-b from-sky-50/50 to-white overflow-hidden">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-800 uppercase tracking-tighter leading-none mb-6"
            >
              Explore <br className="md:hidden" /> <span className="text-sky-500 italic">Our Worlds</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-bold text-slate-500 max-w-2xl mx-auto"
            >
              Dive into interactive zones designed for fun, learning, and discovery.
            </motion.p>
            <div className="mt-6 h-2 w-24 bg-orange-400 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {worlds.map((world, index) => (
              <Link key={index} href={world.href}>
                <InteractiveCard
                  title={world.title}
                  description={world.description}
                  color={world.color}
                  icon={world.icon}
                />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Ground Line Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-sky-400 to-emerald-400" />
      </section>

      {/* 2. PLAY ZONE SECTION: The Games */}
      <section id="play-zone" className="py-24 px-4 bg-orange-50/30 border-b border-slate-100 scroll-mt-24">
        <div className="container mx-auto max-w-4xl text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-400 text-white shadow-xl shadow-orange-200">
              <PlayCircle className="h-12 w-12" />
            </div>
            <h2 className="mb-6 text-5xl font-black text-slate-800">Play Zone</h2>
            <p className="mx-auto max-w-2xl text-2xl font-bold text-slate-600 leading-relaxed">
              Engaging games that build coordination and strategy. Ready to play?
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto pb-16">
          {activeGames['ColoringSuite'] !== false && <ColoringSuite />}
          {activeGames['SoundExplorer'] !== false && <SoundExplorer />}
          {activeGames['BubblePopMath'] !== false && <BubblePopMath />}
        </div>
      </section>

      <Footer />
    </main>
  );
}
