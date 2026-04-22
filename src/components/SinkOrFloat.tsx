"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Trees, Leaf, CircleDollarSign, Ghost } from 'lucide-react';

interface SinkItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  weight: 'heavy' | 'light';
  color: string;
}

const ITEMS: SinkItem[] = [
  { id: 'duck', name: 'Rubber Duck', icon: '🦆', weight: 'light', color: 'bg-yellow-400' },
  { id: 'rock', name: 'Heavy Rock', icon: <Trees className="h-10 w-10" />, weight: 'heavy', color: 'bg-stone-500' },
  { id: 'leaf', name: 'Small Leaf', icon: <Leaf className="h-10 w-10" />, weight: 'light', color: 'bg-emerald-400' },
  { id: 'coin', name: 'Shiny Coin', icon: <CircleDollarSign className="h-10 w-10" />, weight: 'heavy', color: 'bg-amber-500' },
  { id: 'anchor', name: 'Anchor', icon: <Anchor className="h-10 w-10" />, weight: 'heavy', color: 'bg-slate-600' },
  { id: 'ghost', name: 'Light Ghost', icon: <Ghost className="h-10 w-10" />, weight: 'light', color: 'bg-purple-300' },
];

type GameState = 'idle' | 'falling' | 'guessing' | 'result' | 'complete';

export const SinkOrFloat = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<SinkItem | null>(null);
  const [userGuess, setUserGuess] = useState<'sink' | 'float' | null>(null);
  const [remainingItems, setRemainingItems] = useState<SinkItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const startGame = () => {
    const shuffled = [...ITEMS].sort(() => Math.random() - 0.5);
    setRemainingItems(shuffled);
    setScore(0);
    nextRound(shuffled);
  };

  const nextRound = (itemsList: SinkItem[]) => {
    if (itemsList.length === 0) {
      setGameState('complete');
      setCurrentItem(null);
      // Play Clap Sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
      audio.play().catch(() => {});
      return;
    }
    const next = itemsList[0];
    setCurrentItem(next);
    setRemainingItems(itemsList.slice(1));
    setGameState('falling');
    setUserGuess(null);
  };

  const handleGuess = (guess: 'sink' | 'float') => {
    if (!currentItem) return;
    setUserGuess(guess);
    const correct = currentItem.weight === 'heavy' ? 'sink' : 'float';
    
    if (guess === correct) {
      setScore(prev => prev + 1);
    } else {
      setScore(prev => prev - 1);
    }
    
    setGameState('result');
    
    setTimeout(() => {
      nextRound(remainingItems);
    }, 2500);
  };

  return (
    <section className="mt-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Sink or <span className="text-sky-500">Float?</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500 italic">Guess correctly to earn points!</p>
      </div>

      <div className="mx-auto max-w-4xl relative">
        {/* Scoreboard */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          <div className="bg-white px-8 py-2 rounded-full shadow-lg border-2 border-sky-100 flex items-center gap-3">
             <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Score</span>
             <span className={`text-2xl font-black ${score >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{score}</span>
          </div>
        </div>

        {/* Game Container */}
        <div className="relative h-[600px] w-full bg-sky-100/50 rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden">
          
          {/* Water Surface Overlay */}
          <div className="absolute top-1/3 left-0 right-0 h-full bg-sky-400/40 backdrop-blur-[2px] z-10">
            <motion.div 
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 left-0 right-0 h-8 bg-sky-300/30 blur-md"
            />
          </div>

          {/* Bubbles */}
          {isMounted && [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-20, 650], opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: i * 0.8 }}
              className="absolute w-4 h-4 rounded-full bg-white border border-sky-200"
              style={{ left: `${Math.random() * 100}%`, top: -20 }}
            />
          ))}

          {/* Game States */}
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-sky-900/10 backdrop-blur-sm"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startGame}
                  className="rounded-full bg-sky-500 px-16 py-8 text-4xl font-black text-white shadow-2xl hover:bg-sky-600 transition-colors"
                >
                  START GAME ⚓
                </motion.button>
              </motion.div>
            )}

            {gameState === 'complete' && (
               <motion.div 
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md p-8"
              >
                <div className="text-9xl mb-6">👏🌟</div>
                <h3 className="text-6xl font-black text-emerald-600 mb-2">WELL DONE!</h3>
                <p className="text-3xl font-bold text-slate-600 mb-12 text-center">
                  Final Score: <span className="text-emerald-500">{score}</span> / 6
                </p>
                <button 
                  onClick={startGame}
                  className="rounded-full bg-sky-500 px-12 py-5 text-2xl font-black text-white shadow-xl hover:bg-sky-600 transition-transform active:scale-95"
                >
                  Play Again 🔄
                </button>
              </motion.div>
            )}

            {(gameState === 'falling' || gameState === 'guessing' || gameState === 'result') && currentItem && (
              <motion.div
                key={currentItem.id}
                initial={{ y: -100, x: '50%', left: '-50px' }}
                animate={
                  gameState === 'falling' 
                    ? { y: 150 } 
                    : gameState === 'result'
                      ? { y: currentItem.weight === 'heavy' ? 450 : 180 }
                      : { y: 150 }
                }
                onAnimationComplete={() => {
                  if (gameState === 'falling') setGameState('guessing');
                }}
                transition={{ 
                  duration: gameState === 'result' ? 1.5 : 1,
                  type: "spring",
                  bounce: gameState === 'result' ? 0.2 : 0
                }}
                className={`absolute left-1/2 z-20 text-7xl flex items-center justify-center w-24 h-24 rounded-3xl ${currentItem.color} border-4 border-white shadow-xl`}
              >
                {currentItem.icon}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guessing Buttons Overlay */}
          <AnimatePresence>
            {gameState === 'guessing' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-x-0 bottom-12 z-30 flex justify-center gap-8 px-8"
              >
                <button 
                  onClick={() => handleGuess('float')}
                  className="bg-white text-sky-600 px-12 py-6 rounded-3xl font-black text-3xl shadow-2xl hover:bg-sky-50 transition-all border-b-8 border-sky-200 active:border-b-0 active:translate-y-1"
                >
                  FLOAT 🎈
                </button>
                <button 
                  onClick={() => handleGuess('sink')}
                  className="bg-sky-700 text-white px-12 py-6 rounded-3xl font-black text-3xl shadow-2xl hover:bg-sky-800 transition-all border-b-8 border-sky-900 active:border-b-0 active:translate-y-1"
                >
                  SINK ⚓
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Feedback */}
          <AnimatePresence>
            {gameState === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              >
                {userGuess === (currentItem?.weight === 'heavy' ? 'sink' : 'float') ? (
                   <div className="bg-emerald-500 text-white px-10 py-5 rounded-3xl font-black text-4xl shadow-2xl">
                     RIGHT! +1 🌟
                   </div>
                ) : (
                  <div className="bg-rose-500 text-white px-10 py-5 rounded-3xl font-black text-4xl shadow-2xl">
                    WRONG! -1 🔄
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
