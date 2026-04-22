"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, Sprout, Hammer, Shovel, Scissors, Wheat } from 'lucide-react';

type FarmStage = 'prepare' | 'seed' | 'water' | 'sun' | 'harvest' | 'complete';

export const SeedToFlower = () => {
  const [stage, setStage] = useState<FarmStage>('prepare');
  const [isWatering, setIsWatering] = useState(false);
  const [isShining, setIsShining] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextStage = (current: FarmStage) => {
    const soundUrl = 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3';
    new Audio(soundUrl).play().catch(() => {});

    switch (current) {
      case 'prepare': 
        setStage('seed'); 
        speak("Now plant the seed!");
        break;
      case 'seed': 
        setStage('water'); 
        speak("Give it some water!");
        break;
      case 'water': 
        setIsWatering(true);
        setTimeout(() => {
          setIsWatering(false);
          setStage('sun');
          speak("Let the sun shine!");
        }, 2000);
        break;
      case 'sun':
        setIsShining(true);
        setTimeout(() => {
          setIsShining(false);
          setStage('harvest');
          speak("Time to harvest the crop!");
        }, 2000);
        break;
      case 'harvest':
        setStage('complete');
        speak("Well Done! You are a great farmer!");
        break;
    }
  };

  const resetGame = () => {
    setStage('prepare');
    speak("Let's prepare the land!");
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Little <span className="text-emerald-500">Farmer</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Help the crop grow from land to harvest!</p>
      </div>

      <div className="mx-auto max-w-4xl h-[600px] rounded-[3rem] bg-gradient-to-b from-sky-100 to-emerald-50 p-12 shadow-2xl border-4 border-emerald-100 relative overflow-hidden">
        
        {/* Environmental Effects */}
        <AnimatePresence>
          {isWatering && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-20 left-1/2 -translate-x-1/2 z-30">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 300], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                  className="w-1.5 h-10 bg-sky-400 rounded-full mb-2 ml-4 inline-block"
                />
              ))}
            </motion.div>
          )}
          {isShining && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-0 right-0 z-30 p-12">
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }} className="w-48 h-48 bg-orange-400/30 blur-3xl rounded-full" />
              <Sun className="w-24 h-24 text-orange-400 absolute top-12 right-12 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6 z-40">
          {stage === 'prepare' && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => nextStage('prepare')} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-xl border-4 border-stone-200">
              <Shovel className="w-12 h-12 text-stone-500" />
              <span className="font-black text-stone-500 uppercase text-xs">Dig Land</span>
            </motion.button>
          )}
          {stage === 'seed' && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => nextStage('seed')} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-xl border-4 border-amber-200">
              <div className="w-12 h-12 bg-amber-800 rounded-full shadow-inner flex items-center justify-center text-white font-bold">S</div>
              <span className="font-black text-amber-800 uppercase text-xs">Plant Seed</span>
            </motion.button>
          )}
          {stage === 'water' && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => nextStage('water')} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-xl border-4 border-sky-200">
              <CloudRain className="w-12 h-12 text-sky-400" />
              <span className="font-black text-sky-400 uppercase text-xs">Water</span>
            </motion.button>
          )}
          {stage === 'sun' && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => nextStage('sun')} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-xl border-4 border-orange-200">
              <Sun className="w-12 h-12 text-orange-400" />
              <span className="font-black text-orange-400 uppercase text-xs">Sunshine</span>
            </motion.button>
          )}
          {stage === 'harvest' && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => nextStage('harvest')} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-xl border-4 border-rose-200">
              <Scissors className="w-12 h-12 text-rose-500" />
              <span className="font-black text-rose-500 uppercase text-xs">Harvest</span>
            </motion.button>
          )}
        </div>

        {/* The Field */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-amber-900 rounded-t-[5rem] shadow-inner flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Visual Stages */}
            <AnimatePresence mode="wait">
              {stage === 'prepare' && (
                 <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-24 h-8 bg-amber-950/50 rounded-full blur-sm" />
                    ))}
                 </motion.div>
              )}
              {stage === 'seed' && (
                <motion.div key="s" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-6 h-6 bg-amber-800 rounded-full border-2 border-amber-700" />
              )}
              {stage === 'water' && (
                <motion.div key="w" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                   <div className="w-12 h-2 bg-emerald-500/50 rounded-full" />
                   <div className="w-4 h-4 bg-amber-800 rounded-full" />
                </motion.div>
              )}
              {stage === 'sun' && (
                <motion.div key="su" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                   <div className="w-2 h-12 bg-emerald-500 rounded-full" />
                   <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-10 h-5 bg-emerald-400 rounded-full -mt-10 -ml-8 rotate-[-30deg]" />
                </motion.div>
              )}
              {stage === 'harvest' && (
                <motion.div key="h" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-end gap-1">
                   {[...Array(3)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-2 h-32 bg-emerald-600 rounded-full" />
                        <div className="w-8 h-24 bg-yellow-400 rounded-full -mt-32 border-4 border-yellow-500 shadow-md relative overflow-hidden">
                           <div className="absolute inset-0 bg-yellow-600/10 grid grid-cols-2">
                              {[...Array(10)].map((_, j) => <div key={j} className="border-[0.5px] border-yellow-700/10" />)}
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {stage === 'complete' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
            >
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-9xl mb-8">
                🧺🌾
              </motion.div>
              <h3 className="text-5xl font-black text-emerald-600 mb-4 text-center">
                Well Done!
              </h3>
              <p className="text-2xl font-bold text-slate-500 mb-12">You harvested all the crops!</p>
              <button 
                onClick={resetGame}
                className="rounded-full bg-emerald-500 px-12 py-4 text-xl font-bold text-white shadow-xl hover:bg-emerald-600 transition-transform active:scale-95"
              >
                Start New Farm
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Details */}
        <div className="absolute top-1/2 left-8 opacity-20">
           <Sprout className="w-12 h-12 text-emerald-400" />
        </div>
        <div className="absolute top-1/4 right-20 opacity-20 rotate-12">
           <Wheat className="w-16 h-16 text-yellow-400" />
        </div>
      </div>
    </section>
  );
};
