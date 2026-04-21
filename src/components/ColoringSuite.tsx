"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Zap, Cat, TreeDeciduous, Bot } from 'lucide-react';

type ImageKey = 'robot' | 'cat' | 'tree';

const COLORS = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Purple', value: '#A855F7' },
];

const IMAGES = [
  { id: 'robot' as const, label: 'Robot', icon: <Bot /> },
  { id: 'cat' as const, label: 'Cat', icon: <Cat /> },
  { id: 'tree' as const, label: 'Tree', icon: <TreeDeciduous /> },
];

// --- SVG Templates ---
interface SVGProps {
  onPartClick: (partId: string) => void;
  colors: Record<string, string>;
}

const RobotSVG = ({ onPartClick, colors }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="head" x="60" y="20" width="80" height="60" rx="10" stroke="#334155" strokeWidth="4" fill={colors['head'] || 'white'} onClick={() => onPartClick('head')} className="cursor-pointer transition-colors" />
    <rect id="body" x="50" y="90" width="100" height="80" rx="15" stroke="#334155" strokeWidth="4" fill={colors['body'] || 'white'} onClick={() => onPartClick('body')} className="cursor-pointer transition-colors" />
    <rect id="larm" x="20" y="100" width="20" height="50" rx="5" stroke="#334155" strokeWidth="4" fill={colors['larm'] || 'white'} onClick={() => onPartClick('larm')} className="cursor-pointer transition-colors" />
    <rect id="rarm" x="160" y="100" width="20" height="50" rx="5" stroke="#334155" strokeWidth="4" fill={colors['rarm'] || 'white'} onClick={() => onPartClick('rarm')} className="cursor-pointer transition-colors" />
    <circle cx="85" cy="45" r="8" fill="#334155" />
    <circle cx="115" cy="45" r="8" fill="#334155" />
  </svg>
);

const CatSVG = ({ onPartClick, colors }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <circle id="head" cx="100" cy="70" r="50" stroke="#334155" strokeWidth="4" fill={colors['head'] || 'white'} onClick={() => onPartClick('head')} className="cursor-pointer transition-colors" />
    <path id="lear" d="M60 40 L80 30 L90 60 Z" stroke="#334155" strokeWidth="4" fill={colors['lear'] || 'white'} onClick={() => onPartClick('lear')} className="cursor-pointer transition-colors" />
    <path id="rear" d="M140 40 L120 30 L110 60 Z" stroke="#334155" strokeWidth="4" fill={colors['rear'] || 'white'} onClick={() => onPartClick('rear')} className="cursor-pointer transition-colors" />
    <ellipse id="body" cx="100" cy="140" rx="60" ry="40" stroke="#334155" strokeWidth="4" fill={colors['body'] || 'white'} onClick={() => onPartClick('body')} className="cursor-pointer transition-colors" />
    <circle cx="80" cy="70" r="5" fill="#334155" />
    <circle cx="120" cy="70" r="5" fill="#334155" />
  </svg>
);

const TreeSVG = ({ onPartClick, colors }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="trunk" x="90" y="140" width="20" height="40" stroke="#334155" strokeWidth="4" fill={colors['trunk'] || 'white'} onClick={() => onPartClick('trunk')} className="cursor-pointer transition-colors" />
    <circle id="top" cx="100" cy="70" r="50" stroke="#334155" strokeWidth="4" fill={colors['top'] || 'white'} onClick={() => onPartClick('top')} className="cursor-pointer transition-colors" />
    <circle id="left" cx="60" cy="110" r="40" stroke="#334155" strokeWidth="4" fill={colors['left'] || 'white'} onClick={() => onPartClick('left')} className="cursor-pointer transition-colors" />
    <circle id="right" cx="140" cy="110" r="40" stroke="#334155" strokeWidth="4" fill={colors['right'] || 'white'} onClick={() => onPartClick('right')} className="cursor-pointer transition-colors" />
  </svg>
);

export const ColoringSuite = () => {
  const [activeColor, setActiveColor] = useState(COLORS[0].value);
  const [selectedImage, setSelectedImage] = useState<ImageKey>('robot');
  const [filledParts, setFilledParts] = useState<Record<ImageKey, Record<string, string>>>({
    robot: {},
    cat: {},
    tree: {},
  });

  const handlePartClick = (partId: string) => {
    setFilledParts(prev => ({
      ...prev,
      [selectedImage]: {
        ...prev[selectedImage],
        [partId]: activeColor,
      }
    }));
  };

  const renderSVG = () => {
    const props = { onPartClick: handlePartClick, colors: filledParts[selectedImage] };
    switch (selectedImage) {
      case 'robot': return <RobotSVG {...props} />;
      case 'cat': return <CatSVG {...props} />;
      case 'tree': return <TreeSVG {...props} />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Coloring <span className="text-orange-400">Suite</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500">Pick a color and tap a section to paint your world!</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar: Image Selector (Top on Mobile, Left on Desktop) */}
        <div className="flex flex-row gap-4 lg:flex-col lg:w-48 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          {IMAGES.map((img) => (
            <motion.button
              key={img.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(img.id)}
              className={`flex flex-1 lg:flex-none items-center gap-3 rounded-2xl p-4 font-black transition-all ${
                selectedImage === img.id ? 'bg-orange-400 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm border border-slate-100'
              }`}
            >
              <span className="h-6 w-6">{img.icon}</span>
              {img.label}
            </motion.button>
          ))}
        </div>

        {/* Workspace: Main SVG Area */}
        <div className="relative flex-1 rounded-[3rem] bg-white p-8 shadow-2xl lg:p-16 border-4 border-slate-50 min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ type: "spring", damping: 15 }}
              className="h-full w-full max-w-md"
            >
              {renderSVG()}
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-400">
            <Zap className="h-4 w-4 fill-slate-400" />
            INTERACTIVE
          </div>
        </div>

        {/* Palette: Color Picker (Bottom on Mobile, Right on Desktop) */}
        <div className="flex flex-row flex-wrap justify-center gap-4 lg:flex-col lg:w-24">
          <div className="hidden lg:flex items-center justify-center mb-2">
            <Palette className="h-6 w-6 text-slate-400" />
          </div>
          {COLORS.map((color) => (
            <motion.button
              key={color.value}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setActiveColor(color.value)}
              className={`h-12 w-12 rounded-full border-4 transition-all ${
                activeColor === color.value ? 'border-slate-800 scale-110 shadow-xl' : 'border-white'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
