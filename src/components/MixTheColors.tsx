"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

const COLORS = [
  { id: 'red', name: 'Red', hex: '#EF4444' },
  { id: 'blue', name: 'Blue', hex: '#3B82F6' },
  { id: 'yellow', name: 'Yellow', hex: '#FBBF24' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
];

const MIXTURES: Record<string, { name: string; hex: string; parts: string[] }> = {
  'red-blue': { name: 'Purple', hex: '#A855F7', parts: ['red', 'blue'] },
  'blue-red': { name: 'Purple', hex: '#A855F7', parts: ['red', 'blue'] },
  'red-yellow': { name: 'Orange', hex: '#F97316', parts: ['red', 'yellow'] },
  'yellow-red': { name: 'Orange', hex: '#F97316', parts: ['red', 'yellow'] },
  'blue-yellow': { name: 'Green', hex: '#22C55E', parts: ['blue', 'yellow'] },
  'yellow-blue': { name: 'Green', hex: '#22C55E', parts: ['blue', 'yellow'] },
  // Tints (Lightening)
  'red-white': { name: 'Pink', hex: '#FDA4AF', parts: ['red', 'white'] },
  'white-red': { name: 'Pink', hex: '#FDA4AF', parts: ['red', 'white'] },
  'blue-white': { name: 'Light Blue', hex: '#BAE6FD', parts: ['blue', 'white'] },
  'white-blue': { name: 'Light Blue', hex: '#BAE6FD', parts: ['blue', 'white'] },
  'yellow-white': { name: 'Light Yellow', hex: '#FEF9C3', parts: ['yellow', 'white'] },
  'white-yellow': { name: 'Light Yellow', hex: '#FEF9C3', parts: ['yellow', 'white'] },
};

export const MixTheColors = () => {
  const [jar1, setJar1] = useState<string | null>(null);
  const [jar2, setJar2] = useState<string | null>(null);
  const [result, setResult] = useState<{ name: string; hex: string } | null>(null);
  const [targetMix, setTargetMix] = useState<typeof MIXTURES[string] | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startNewChallenge = () => {
    const keys = Object.keys(MIXTURES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const target = MIXTURES[randomKey];
    setTargetMix(target);
    setJar1(null);
    setJar2(null);
    setResult(null);
    setFeedback(null);
    
    setTimeout(() => {
      const part1 = COLORS.find(c => c.id === target.parts[0])?.name;
      const part2 = COLORS.find(c => c.id === target.parts[1])?.name;
      speak(`Can you make ${target.name}? Mix ${part1} and ${part2}!`);
    }, 500);
  };

  const handleStart = () => {
    setIsPlaying(true);
    startNewChallenge();
  };

  const handleMix = (colorId: string) => {
    if (!isPlaying || feedback === "Well Done!") return;
    
    if (!jar1) {
      setJar1(colorId);
    } else if (!jar2 && jar1 !== colorId) {
      setJar2(colorId);
      const mixKey = `${jar1}-${colorId}`;
      const mixResult = MIXTURES[mixKey];
      setResult(mixResult);

      if (mixResult?.name === targetMix?.name) {
        setFeedback("Well Done!");
        speak("Well Done!");
        new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3').play().catch(() => {});
      } else {
        setFeedback("Need Focus");
        speak("Need Focus");
        new Audio('https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3').play().catch(() => {});
      }
    }
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Mix the <span className="text-purple-500">Colors</span>
        </h2>
        
        {isPlaying && targetMix && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-8 inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-purple-100"
          >
            <span className="text-xl font-bold text-slate-500 uppercase tracking-tight">Challenge: Make</span>
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full" style={{ backgroundColor: targetMix.hex }} />
               <span className="text-2xl font-black" style={{ color: targetMix.hex }}>{targetMix.name}</span>
            </div>
            <span className="text-slate-300 mx-2">|</span>
            <div className="flex gap-2 text-sm font-black text-slate-400">
               {targetMix.parts.map(p => COLORS.find(c => c.id === p)?.name).join(' + ')}
            </div>
          </motion.div>
        )}
      </div>

      <div className="mx-auto max-w-4xl bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-purple-50 relative overflow-hidden min-h-[400px]">
        {!isPlaying ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
             <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="rounded-full bg-purple-500 px-16 py-8 text-4xl font-black text-white shadow-2xl hover:bg-purple-600 transition-colors"
            >
              PLAY 🎨
            </motion.button>
            <p className="mt-6 text-xl font-bold text-slate-500 uppercase tracking-widest">Discover Color Magic!</p>
          </div>
        ) : (
          <>
            {/* Feedback Overlay */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute top-8 left-1/2 -translate-x-1/2 z-40 px-10 py-4 rounded-2xl shadow-xl font-black text-2xl ${
                    feedback === "Well Done!" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row items-center justify-around gap-12">
              
              {/* Color Selection */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                {COLORS.map((color) => (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMix(color.id)}
                    disabled={jar1 === color.id || jar2 === color.id}
                    className={`w-24 h-32 rounded-3xl border-4 shadow-xl transition-all relative overflow-hidden ${
                      color.id === 'white' ? 'border-slate-200' : 'border-slate-100'
                    } ${jar1 === color.id || jar2 === color.id ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div className="absolute inset-0 bg-slate-50 opacity-20" />
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 shadow-inner" style={{ backgroundColor: color.hex }} />
                    <span className={`absolute inset-0 flex items-center justify-center font-black drop-shadow-md text-sm uppercase ${color.id === 'white' ? 'text-slate-400' : 'text-white'}`}>
                      {color.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mixing Station */}
              <div className="flex flex-col items-center gap-8">
                <div className="flex items-end gap-4 h-64">
                  {/* Jar 1 */}
                  <div className="w-24 h-32 bg-slate-50 rounded-b-3xl border-4 border-slate-200 relative overflow-hidden">
                    {jar1 && (
                      <motion.div 
                        initial={{ y: 100 }} animate={{ y: 0 }}
                        className="absolute inset-0" style={{ backgroundColor: COLORS.find(c => c.id === jar1)?.hex }} 
                      />
                    )}
                  </div>
                  <span className="text-4xl font-black text-slate-300 pb-8">+</span>
                  {/* Jar 2 */}
                  <div className="w-24 h-32 bg-slate-50 rounded-b-3xl border-4 border-slate-200 relative overflow-hidden">
                    {jar2 && (
                      <motion.div 
                        initial={{ y: 100 }} animate={{ y: 0 }}
                        className="absolute inset-0" style={{ backgroundColor: COLORS.find(c => c.id === jar2)?.hex }} 
                      />
                    )}
                  </div>
                </div>
                
                <div className="h-1 w-64 bg-slate-100 rounded-full" />
                
                {/* Result Jar */}
                <div className="relative">
                  <div className="w-48 h-56 bg-slate-50 rounded-b-[3rem] border-8 border-slate-100 relative overflow-hidden shadow-inner">
                    <AnimatePresence>
                      {result && (
                        <motion.div 
                          initial={{ y: 200 }}
                          animate={{ y: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ backgroundColor: result.hex }}
                        >
                          <span className="text-3xl font-black text-white drop-shadow-lg uppercase">
                            {result.name}!
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!result && (
                      <div className="absolute inset-0 flex items-center justify-center">
                          <FlaskConical className="w-16 h-16 text-slate-200" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(result || feedback) && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <button 
                  onClick={startNewChallenge}
                  className="rounded-full bg-purple-500 px-12 py-4 text-xl font-bold text-white shadow-xl hover:bg-purple-600 transition-colors"
                >
                  {feedback === "Well Done!" ? "Next Challenge 🌟" : "Try Again 🔄"}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
