"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, Apple, Banana, Plane, Bike, Ghost } from 'lucide-react';

interface MatchItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ITEMS: MatchItem[] = [
  { id: 'car', name: 'Car', icon: <Car className="h-12 w-12" />, color: 'text-red-500' },
  { id: 'apple', name: 'Apple', icon: <Apple className="h-12 w-12" />, color: 'text-rose-500' },
  { id: 'banana', name: 'Banana', icon: <Banana className="h-12 w-12" />, color: 'text-yellow-400' },
  { id: 'plane', name: 'Plane', icon: <Plane className="h-12 w-12" />, color: 'text-sky-500' },
  { id: 'bike', name: 'Bike', icon: <Bike className="h-12 w-12" />, color: 'text-emerald-500' },
  { id: 'ghost', name: 'Ghost', icon: <Ghost className="h-12 w-12" />, color: 'text-slate-400' },
];

export const ShadowMatch = () => {
  const [shuffledItems, setShuffledItems] = useState<MatchItem[]>([]);
  const [shuffledShadows, setShuffledShadows] = useState<MatchItem[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [drawingLine, setDrawingLine] = useState<{ startId: string; startPos: { x: number; y: number }; currentPos: { x: number; y: number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shadowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setShuffledItems([...ITEMS].sort(() => Math.random() - 0.5));
    setShuffledShadows([...ITEMS].sort(() => Math.random() - 0.5));
  }, []);

  const getRelativePos = (e: React.MouseEvent | Touch | React.Touch) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleStart = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    if (matched.includes(id)) return;
    
    const event = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const pos = getRelativePos(event);
    setDrawingLine({ startId: id, startPos: pos, currentPos: pos });
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingLine) return;
    const event = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    setDrawingLine(prev => prev ? { ...prev, currentPos: getRelativePos(event) } : null);
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingLine) return;

    const event = 'changedTouches' in e ? e.changedTouches[0] : (e as React.MouseEvent);
    const elementAtPoint = document.elementFromPoint(event.clientX, event.clientY);
    const shadowId = elementAtPoint?.closest('[data-shadow-id]')?.getAttribute('data-shadow-id');

    if (shadowId === drawingLine.startId) {
      setMatched(prev => [...prev, shadowId]);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.play().catch(() => {});
    }
    
    setDrawingLine(null);
  };

  const getMatchedLine = (id: string) => {
    const itemEl = itemRefs.current[id];
    const shadowEl = shadowRefs.current[id];
    if (!itemEl || !shadowEl || !containerRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    const shadowRect = shadowEl.getBoundingClientRect();

    return {
      x1: itemRect.left + itemRect.width / 2 - containerRect.left,
      y1: itemRect.top + itemRect.height / 2 - containerRect.top,
      x2: shadowRect.left + shadowRect.width / 2 - containerRect.left,
      y2: shadowRect.top + shadowRect.height / 2 - containerRect.top,
    };
  };

  return (
    <section className="mt-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Shadow <span className="text-emerald-500">Match</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Draw a line from each object to its matching shadow!</p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="relative mx-auto max-w-5xl rounded-[3rem] bg-white p-12 shadow-2xl border-4 border-emerald-50 overflow-hidden touch-none"
      >
        {/* SVG Overlay for Lines */}
        <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full">
          {/* Completed Lines */}
          {matched.map(id => {
            const pos = getMatchedLine(id);
            if (!pos) return null;
            return (
              <motion.line
                key={`line-${id}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={pos.x1} y1={pos.y1} x2={pos.x2} y2={pos.y2}
                stroke="#10B981" strokeWidth="6" strokeLinecap="round"
                strokeDasharray="1, 12"
              />
            );
          })}
          
          {/* Current Drawing Line */}
          {drawingLine && (
            <line
              x1={drawingLine.startPos.x} y1={drawingLine.startPos.y}
              x2={drawingLine.currentPos.x} y2={drawingLine.currentPos.y}
              stroke="#64748b" strokeWidth="4" strokeLinecap="round" strokeDasharray="8, 8"
            />
          )}
        </svg>

        <div className="relative z-10 flex flex-col gap-24 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Items Column */}
          <div className="flex flex-wrap justify-center gap-8 lg:flex-col lg:w-32">
            {shuffledItems.map((item) => (
              <div 
                key={item.id} 
                ref={el => { itemRefs.current[item.id] = el }}
                onMouseDown={(e) => handleStart(item.id, e)}
                onTouchStart={(e) => handleStart(item.id, e)}
                className={`flex h-20 w-20 cursor-crosshair items-center justify-center rounded-2xl bg-white shadow-lg border-2 transition-all select-none ${
                  matched.includes(item.id) ? 'border-emerald-500 opacity-50' : 'border-slate-100 hover:scale-110 active:scale-95'
                } ${item.color}`}
              >
                {item.icon}
              </div>
            ))}
          </div>

          {/* Shadows Column */}
          <div className="flex flex-wrap justify-center gap-8 lg:flex-col lg:w-32">
            {shuffledShadows.map((item) => (
              <div 
                key={item.id}
                ref={el => { shadowRefs.current[item.id] = el }}
                data-shadow-id={item.id}
                className={`flex h-20 w-20 items-center justify-center rounded-2xl transition-all shadow-inner border-4 ${
                  matched.includes(item.id) 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : 'bg-slate-800 text-slate-600 border-slate-700'
                }`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        {matched.length === ITEMS.length && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <h3 className="text-5xl font-black text-emerald-600 mb-6">Masterpiece! 🎨</h3>
            <button 
              onClick={() => { setMatched([]); setShuffledItems([...ITEMS].sort(() => Math.random() - 0.5)); setShuffledShadows([...ITEMS].sort(() => Math.random() - 0.5)); }}
              className="rounded-full bg-emerald-500 px-12 py-4 text-xl font-bold text-white shadow-xl hover:bg-emerald-600 transition-transform active:scale-95"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
