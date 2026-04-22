"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Sparkles, RotateCcw } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const LetterTrace = () => {
  const [activeLetter, setActiveLetter] = useState('A');
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const totalDrawnRef = useRef(0);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle high-performance rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal resolution
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      pointsRef.current = pointsRef.current
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < 60);

      pointsRef.current.forEach(p => {
        const opacity = 1 - p.age / 60;
        const size = (1 - p.age / 60) * 12;
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(251, 191, 36, ${opacity * 0.9})`); // Yellow-400
        gradient.addColorStop(1, `rgba(251, 191, 36, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Extra sparkle
        if (p.age % 5 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillRect(p.x + (Math.random() - 0.5) * 15, p.y + (Math.random() - 0.5) * 15, 3, 3);
        }
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || isDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    pointsRef.current.push({ x, y, age: 0 });
    totalDrawnRef.current += 1;

    // Trigger finish after enough tracing
    if (totalDrawnRef.current > 150) {
      finishLetter();
    }
  };

  const finishLetter = () => {
    if (isDone) return;
    setIsDone(true);
    setIsDrawing(false);
    speak("Well Done!");
  };

  const nextLetter = () => {
    const currentIndex = LETTERS.indexOf(activeLetter);
    const nextIndex = (currentIndex + 1) % LETTERS.length;
    setActiveLetter(LETTERS[nextIndex]);
    resetGameState();
  };

  const resetGameState = () => {
    setIsDone(false);
    pointsRef.current = [];
    totalDrawnRef.current = 0;
  };

  const clearCanvas = () => {
    resetGameState();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointsRef.current.push({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top, 
      age: 0 
    });
  };

  return (
    <section className="mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Letter <span className="text-yellow-500">Trace</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Trace the letter with magical star dust!</p>
      </div>

      <div className="mx-auto max-w-4xl rounded-[3rem] bg-slate-900 p-8 shadow-2xl border-4 border-yellow-500/20 relative overflow-hidden">
        
        {/* Letter Selector */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {LETTERS.map(l => (
            <button
              key={l}
              onClick={() => { setActiveLetter(l); clearCanvas(); }}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xl font-black transition-all ${
                activeLetter === l 
                  ? 'bg-yellow-400 text-slate-900 scale-110 shadow-lg shadow-yellow-400/20' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="relative aspect-square md:aspect-video w-full flex items-center justify-center bg-slate-800/50 rounded-[2rem] border-2 border-slate-700/50">
          
          {/* Background Letter (Guide) */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="text-[20rem] md:text-[25rem] font-black text-white/5 tracking-tighter uppercase italic">
              {activeLetter}
            </span>
            <span className="absolute text-[20rem] md:text-[25rem] font-black text-yellow-400/10 tracking-tighter uppercase italic blur-sm">
              {activeLetter}
            </span>
          </div>

          {/* Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerUp={() => setIsDrawing(false)}
            onPointerLeave={() => setIsDrawing(false)}
            onPointerMove={handlePointerMove}
            className="absolute inset-0 h-full w-full cursor-crosshair touch-none z-10"
          />

          {/* UI Overlays */}
          <div className="absolute top-6 right-6 flex gap-4 z-20">
            <button 
              onClick={clearCanvas}
              className="p-4 rounded-2xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors shadow-lg border border-slate-600"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 z-20">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-black text-yellow-400 uppercase tracking-widest">Star Dust Ink</span>
          </div>

          {/* Success Overlay */}
          <AnimatePresence>
            {isDone && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm p-8"
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-8xl mb-6"
                >
                  ⭐
                </motion.div>
                <h3 className="text-5xl font-black text-yellow-400 mb-8 text-center">
                  Magical Tracing!
                </h3>
                <div className="flex gap-6">
                  <button 
                    onClick={resetGameState}
                    className="rounded-full bg-slate-700 px-8 py-4 text-xl font-bold text-white shadow-xl hover:bg-slate-600 transition-colors"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={nextLetter}
                    className="rounded-full bg-yellow-400 px-10 py-4 text-xl font-bold text-slate-900 shadow-xl hover:bg-yellow-300 transition-colors"
                  >
                    Next Letter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
