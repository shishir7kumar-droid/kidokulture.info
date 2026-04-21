"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Star, Heart, Cloud, Moon, Sun, MousePointer2 } from 'lucide-react';

interface MagicElement {
  id: number;
  x: number;
  y: number;
  type: 'shape' | 'note';
  color: string;
  icon: React.ReactNode;
}

const COLORS = ['bg-orange-400', 'bg-sky-400', 'bg-emerald-400', 'bg-pink-400', 'bg-purple-400', 'bg-yellow-400'];
const ICONS = [
  <Star key="star" className="h-full w-full" />,
  <Heart key="heart" className="h-full w-full" />,
  <Cloud key="cloud" className="h-full w-full" />,
  <Moon key="moon" className="h-full w-full" />,
  <Sun key="sun" className="h-full w-full" />,
  <Music key="music" className="h-full w-full" />,
];

export const Playground = () => {
  const [elements, setElements] = useState<MagicElement[]>([]);

  const addElement = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newElement: MagicElement = {
      id: Date.now(),
      x,
      y,
      type: Math.random() > 0.5 ? 'shape' : 'note',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    };

    setElements((prev) => [...prev.slice(-15), newElement]); // Keep last 15 elements for performance
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Magic <span className="text-sky-500">Canvas</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">
          Click anywhere inside the box to create some magic!
        </p>
      </div>

      {/* CSS Grid Layout: 1 column on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Tools - Rearranges on Mobile */}
        <div className="order-2 lg:order-1 lg:col-span-1 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
            <h3 className="mb-4 text-2xl font-black text-slate-800">Your Tools</h3>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-2">
              {ICONS.map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 p-4 text-sky-600 shadow-sm"
                >
                  {Icon}
                </motion.div>
              ))}
            </div>
            <button 
              onClick={() => setElements([])}
              className="mt-8 w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-500 hover:bg-slate-200 transition-colors"
            >
              Clear Canvas
            </button>
          </div>

          <div className="hidden lg:block rounded-3xl bg-emerald-50 p-6">
            <p className="text-sm font-bold text-emerald-700">
              💡 Tip: Click rapidly to create a magic trail!
            </p>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <div
            onClick={addElement}
            className="relative h-[400px] w-full cursor-crosshair overflow-hidden rounded-[3rem] border-4 border-dashed border-sky-200 bg-white shadow-2xl transition-all hover:border-sky-300 md:h-[600px]"
          >
            {elements.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-slate-300">
                <MousePointer2 className="h-16 w-16 animate-bounce" />
                <p className="text-2xl font-black">Click Here!</p>
              </div>
            )}

            <AnimatePresence>
              {elements.map((el) => (
                <motion.div
                  key={el.id}
                  initial={{ scale: 0, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    left: el.x - 24,
                    top: el.y - 24,
                  }}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${el.color} p-2 text-white shadow-lg`}
                >
                  {el.icon}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Ambient Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
