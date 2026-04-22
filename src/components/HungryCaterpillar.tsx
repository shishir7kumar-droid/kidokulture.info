"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Banana, Cherry, Grape, Citrus } from 'lucide-react';

interface FoodItem {
  id: number;
  number: number;
  type: 'apple' | 'banana' | 'cherry' | 'grape' | 'citrus';
  color: string;
  icon: React.ReactNode;
}

const FRUIT_TYPES = [
  { type: 'apple', color: 'text-red-500', icon: <Apple className="h-10 w-10" /> },
  { type: 'banana', color: 'text-yellow-400', icon: <Banana className="h-10 w-10" /> },
  { type: 'cherry', color: 'text-rose-600', icon: <Cherry className="h-10 w-10" /> },
  { type: 'grape', color: 'text-purple-500', icon: <Grape className="h-10 w-10" /> },
  { type: 'citrus', color: 'text-orange-500', icon: <Citrus className="h-10 w-10" /> },
];

export const HungryCaterpillar = () => {
  const [targetNumber, setTargetNumber] = useState(1);
  const [fruits, setFruits] = useState<FoodItem[]>([]);
  const [segments, setSegments] = useState(0);
  const [isFeeding, setIsFeeding] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.2;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const spawnFruits = useCallback(() => {
    const numbers: number[] = [targetNumber];
    
    // Add two more unique random numbers
    while (numbers.length < 3) {
      const rand = Math.floor(Math.random() * 12) + 1;
      if (!numbers.includes(rand)) {
        numbers.push(rand);
      }
    }
    
    // Shuffle the numbers
    numbers.sort(() => Math.random() - 0.5);

    const newFruits: FoodItem[] = numbers.map((num, i) => {
      const typeInfo = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
      return {
        id: Date.now() + i,
        number: num,
        type: typeInfo.type as any,
        color: typeInfo.color,
        icon: typeInfo.icon
      };
    });
    setFruits(newFruits);
  }, [targetNumber]);

  useEffect(() => {
    spawnFruits();
  }, [targetNumber, spawnFruits]);

  const handleFeed = (fruit: FoodItem) => {
    if (fruit.number === targetNumber) {
      setIsFeeding(true);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2048/2048-preview.mp3');
      audio.play().catch(() => {});

      setTimeout(() => {
        const nextSegments = segments + 1;
        setSegments(nextSegments);
        
        if (nextSegments >= 10) {
          setGameOver(true);
        } else {
          setTargetNumber(prev => prev + 1);
          setIsFeeding(false);
        }
      }, 600);
    } else {
      // Speak "Wrong" instead of sound
      speak("Wrong");
      
      setSegments(prev => Math.max(0, prev - 1));
      setTargetNumber(prev => Math.max(1, segments)); 
    }
  };

  const resetGame = () => {
    setTargetNumber(1);
    setSegments(0);
    setGameOver(false);
    setIsFeeding(false);
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Hungry <span className="text-emerald-500">Caterpillar</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Feed the caterpillar the fruit with number {targetNumber}!</p>
      </div>

      <div className="relative mx-auto max-w-4xl h-[600px] rounded-[3rem] bg-gradient-to-b from-sky-100 to-white p-8 shadow-2xl border-4 border-emerald-100 overflow-hidden">
        
        {/* Fruits Area */}
        <div className="flex justify-around pt-12">
          <AnimatePresence mode="popLayout">
            {!gameOver && fruits.map((fruit) => (
              <motion.div
                key={fruit.id}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                drag
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  if (info.point.y > 400) handleFeed(fruit);
                }}
                className={`flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl cursor-grab active:cursor-grabbing border-b-4 border-slate-200 ${fruit.color}`}
              >
                {fruit.icon}
                <span className="text-3xl font-black mt-2">{fruit.number}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Caterpillar Area */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="flex -space-x-4">
            {/* Body Segments */}
            {[...Array(segments)].map((_, i) => (
              <motion.div
                key={i}
                animate={isFeeding ? { 
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0] 
                } : { 
                  y: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1, 
                  repeat: isFeeding ? 0 : Infinity 
                }}
                className={`h-16 w-16 rounded-full bg-emerald-400 border-4 border-emerald-500 shadow-md ${i === segments - 1 ? 'z-10' : ''}`}
              >
                {/* Optional spots on segment */}
                <div className="h-3 w-3 rounded-full bg-emerald-600/20 m-2" />
              </motion.div>
            ))}
            
            {/* Head */}
            <motion.div
              animate={isFeeding ? { scale: [1, 1.3, 1] } : {}}
              className="h-20 w-20 rounded-full bg-rose-500 border-4 border-rose-600 shadow-lg relative z-20"
            >
              {/* Eyes */}
              <div className="absolute top-4 left-4 h-4 w-4 rounded-full bg-yellow-200">
                <div className="h-2 w-2 rounded-full bg-slate-800 m-1" />
              </div>
              <div className="absolute top-4 right-4 h-4 w-4 rounded-full bg-yellow-200">
                <div className="h-2 w-2 rounded-full bg-slate-800 m-1" />
              </div>
              {/* Mouth */}
              <motion.div 
                animate={isFeeding ? { height: [4, 12, 4] } : {}}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 bg-rose-800 rounded-full" 
              />
            </motion.div>
          </div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-4"
              >
                🦋
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p className="text-4xl font-black text-emerald-600 bg-emerald-50 px-8 py-4 rounded-3xl shadow-sm">
                  "Thank You!" ✨
                </p>
              </motion.div>
              <h3 className="text-4xl font-black text-rose-600 mb-6 text-center px-4">
                You helped the Caterpillar become a Butterfly!
              </h3>
              <button 
                onClick={resetGame}
                className="rounded-full bg-emerald-500 px-12 py-4 text-xl font-bold text-white shadow-xl hover:bg-emerald-600"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Grass */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-emerald-500/20 flex items-end justify-around">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-8 w-1 bg-emerald-600/30 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
};
