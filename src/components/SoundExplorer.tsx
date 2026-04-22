"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ANIMALS = [
  { 
    id: 'cat', 
    name: 'Cat', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774875/cat_okdfdm.png', 
    color: 'bg-orange-100', 
    borderColor: 'border-orange-400',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776773790/cat_qutglg.wav',
    animation: { y: [0, -20, 0, -10, 0] } 
  },
  { 
    id: 'monkey', 
    name: 'Monkey', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774877/monkey_thmhyf.png', 
    color: 'bg-yellow-100', 
    borderColor: 'border-yellow-600',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776773791/monkey_rgpaeb.wav',
    animation: { y: [0, -20, 0, -20, 0], rotate: [0, 10, -10, 10, -10, 0] } 
  },
  { 
    id: 'bird', 
    name: 'Bird', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774875/bird_ms1pq7.png', 
    color: 'bg-emerald-100', 
    borderColor: 'border-emerald-400',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776774085/birds_mnxavp.wav',
    animation: { x: [0, 10, -10, 10, -10, 0] } 
  },
  { 
    id: 'horse', 
    name: 'Horse', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774876/horse_i2kyjn.png', 
    color: 'bg-stone-100', 
    borderColor: 'border-stone-500',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776773791/horse_yekfsw.wav',
    animation: { y: [0, -15, 0], x: [0, 10, 0] } 
  },
  { 
    id: 'cock', 
    name: 'Cock', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774875/cock_j2g9ti.png', 
    color: 'bg-red-100', 
    borderColor: 'border-red-500',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776773791/Cock_ugsfud.wav',
    animation: { y: [0, -20, 0], rotate: [0, 5, -5, 5, -5, 0] } 
  },
  { 
    id: 'cow', 
    name: 'Cow', 
    imageUrl: 'https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776774876/cow_mttvvj.png', 
    color: 'bg-amber-100', 
    borderColor: 'border-amber-600',
    sound: 'https://res.cloudinary.com/dvgv5h1u1/video/upload/v1776773791/cow_ksjlvd.wav',
    animation: { rotate: [0, 5, -5, 5, -5, 0], scale: [1, 1.05, 1] } 
  },
];

export const SoundExplorer = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playSound = (id: string, soundUrl: string) => {
    setPlayingId(id);
    const audio = new Audio(soundUrl);
    audio.play().catch(err => console.error("Audio play failed:", err));
    
    // Reset animation after 2 seconds
    setTimeout(() => {
      setPlayingId(null);
    }, 2000);
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Sound <span className="text-sky-500">Explorer</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Tap an animal to hear its voice and watch it dance!</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {ANIMALS.map((animal) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={playingId === animal.id ? animal.animation : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            onClick={() => playSound(animal.id, animal.sound)}
            className={`flex flex-col items-center justify-center gap-4 rounded-[2rem] p-8 shadow-xl transition-all border-b-4 hover:border-b-8 ${animal.color} ${animal.borderColor}`}
          >
            <div className="relative h-24 w-24">
              <Image 
                src={animal.imageUrl} 
                alt={animal.name} 
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-2xl font-black uppercase tracking-wider text-slate-700">{animal.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
