"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bubble {
  id: number;
  number: number;
  x: number;
  size: number;
  color: string;
}

const COLORS = [
  'bg-pink-300', 'bg-sky-300', 'bg-emerald-300', 'bg-yellow-300', 
  'bg-purple-300', 'bg-orange-300', 'bg-blue-300'
];

const NUMBER_SOUNDS: Record<number, string> = {
  1: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/001%20one.mp3',
  2: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/002%20two.mp3',
  3: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/003%20three.mp3',
  4: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/004%20four.mp3',
  5: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/005%20five.mp3',
  6: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/006%20six.mp3',
  7: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/007%20seven.mp3',
  8: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/008%20eight.mp3',
  9: 'https://raw.githubusercontent.com/garry-s/speaking-clock-audio/master/British%20Amy/009%20nine.mp3',
};

export const BubblePopMath = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync ref with state
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a nice female voice
      const preferredVoice = voices.find(v => 
        (v.name.includes('Female') || v.name.includes('Google UK English') || v.name.includes('Zira') || v.name.includes('Samantha')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 1;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const speakNumber = useCallback((num: number) => {
    if (NUMBER_SOUNDS[num]) {
      const audio = new Audio(NUMBER_SOUNDS[num]);
      audio.play().catch(() => speak(num.toString()));
    } else {
      speak(num.toString());
    }
  }, [speak]);

  const startRound = useCallback((activeState: boolean) => {
    if (!activeState) return;
    const nextTarget = Math.floor(Math.random() * 9) + 1;
    setTargetNumber(nextTarget);
    
    speak("Pop the number");
    setTimeout(() => {
      speakNumber(nextTarget);
    }, 1000);
  }, [speak, speakNumber]);

  const endGame = useCallback(() => {
    setGameActive(false);
    setGameEnded(true);
    setTargetNumber(null);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const finalScore = scoreRef.current;
    speak(`Game Over! Your final score is`);
    
    setTimeout(() => {
      if (finalScore >= 1 && finalScore <= 9) {
        speakNumber(finalScore);
      } else {
        speak(finalScore.toString());
      }
    }, 2200);
  }, [speak, speakNumber]);

  const spawnBubble = useCallback(() => {
    if (!gameActive) return;
    const id = Date.now() + Math.random();
    const number = Math.floor(Math.random() * 9) + 1;
    const size = 80 + Math.random() * 40;
    const x = Math.random() * 80 + 10;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const newBubble: Bubble = { id, number, x, size, color };
    setBubbles(prev => [...prev, newBubble]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 5000);
  }, [gameActive]);

  useEffect(() => {
    let spawnInterval: NodeJS.Timeout;
    if (gameActive) {
      spawnInterval = setInterval(spawnBubble, 1200);
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (spawnInterval) clearInterval(spawnInterval);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameActive, spawnBubble, endGame]);

  const startGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setGameActive(true);
    setGameEnded(false);
    setTimeLeft(120);
    setBubbles([]);
    
    const initialTarget = Math.floor(Math.random() * 9) + 1;
    setTargetNumber(initialTarget);
    speak("Pop the number");
    setTimeout(() => speakNumber(initialTarget), 1000);
  };

  const handlePop = (bubble: Bubble) => {
    if (!gameActive) return;

    if (bubble.number === targetNumber) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});

      setScore(prev => prev + 1);
      setBubbles([]); 
      startRound(true);
    } else {
      speak("Need Focus");
    }
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Bubble <span className="text-pink-500">Pop Math</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Pop as many numbers as you can in 120 seconds!</p>
      </div>

      <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem] bg-gradient-to-b from-sky-50 to-white shadow-2xl border-4 border-sky-100">
        {!gameActive ? (
          <div className="flex flex-col h-full items-center justify-center bg-white/50 backdrop-blur-sm">
            {gameEnded && (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center mb-8">
                <h3 className="text-5xl font-black text-pink-500 mb-2">Game Over!</h3>
                <p className="text-3xl font-bold text-slate-600">Final Score: {score}</p>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="rounded-full bg-pink-500 px-12 py-6 text-3xl font-black text-white shadow-xl hover:bg-pink-600 transition-colors"
            >
              {gameEnded ? "Play Again!" : "Start Game!"}
            </motion.button>
          </div>
        ) : (
          <>
            <div className="absolute top-8 left-8 z-20 rounded-2xl bg-white/80 px-6 py-3 backdrop-blur-md shadow-md border-2 border-pink-200">
              <p className="text-2xl font-black text-pink-600">Score: {score}</p>
            </div>

            <div className="absolute top-8 right-8 z-20 rounded-2xl bg-pink-500 px-6 py-3 shadow-md">
              <p className="text-xl font-bold text-white uppercase tracking-tighter">Time: {timeLeft}s</p>
            </div>

            {/* Instruction Overlay */}
            {targetNumber && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <span className="text-[15rem] font-black text-pink-500">{targetNumber}</span>
              </div>
            )}

            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.button
                  key={bubble.id}
                  initial={{ y: 550, opacity: 0, scale: 0.5 }}
                  animate={{ y: -100, opacity: 1, scale: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  onClick={() => handlePop(bubble)}
                  style={{ 
                    left: `${bubble.x}%`, 
                    width: bubble.size, 
                    height: bubble.size 
                  }}
                  className={`absolute flex items-center justify-center rounded-full text-3xl font-black text-white shadow-lg backdrop-blur-[2px] border-4 border-white/50 ${bubble.color}`}
                >
                  {bubble.number}
                  <div className="absolute top-2 left-4 h-4 w-6 rounded-full bg-white/30 rotate-[-45deg]" />
                </motion.button>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
};
