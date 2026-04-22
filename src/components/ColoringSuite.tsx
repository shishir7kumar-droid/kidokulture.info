"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Zap, Cat, TreeDeciduous, Bot, Sun, Home, Flower2 } from 'lucide-react';

type ImageKey = 'robot' | 'cat' | 'tree' | 'sun' | 'house' | 'flower';

const COLORS = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Light Green', value: '#86EFAC' },
  { name: 'Light Blue', value: '#7DD3FC' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Brown', value: '#78350F' },
  { name: 'Black', value: '#1E293B' },
];

const IMAGES = [
  { id: 'robot' as const, label: 'Robot', icon: <Bot /> },
  { id: 'cat' as const, label: 'Cat', icon: <Cat /> },
  { id: 'tree' as const, label: 'Tree', icon: <TreeDeciduous /> },
  { id: 'sun' as const, label: 'Sun', icon: <Sun /> },
  { id: 'house' as const, label: 'House', icon: <Home /> },
  { id: 'flower' as const, label: 'Flower', icon: <Flower2 /> },
];

// --- SVG Templates ---
interface SVGProps {
  onPartClick?: (partId: string) => void;
  colors: Record<string, string>;
  isReference?: boolean;
}

const RobotSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="head" x="60" y="20" width="80" height="60" rx="10" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['head'] || 'white'} onClick={() => onPartClick?.('head')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <rect id="body" x="50" y="90" width="100" height="80" rx="15" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['body'] || 'white'} onClick={() => onPartClick?.('body')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <rect id="larm" x="20" y="100" width="20" height="50" rx="5" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['larm'] || 'white'} onClick={() => onPartClick?.('larm')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <rect id="rarm" x="160" y="100" width="20" height="50" rx="5" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['rarm'] || 'white'} onClick={() => onPartClick?.('rarm')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <circle cx="85" cy="45" r={isReference ? "4" : "8"} fill="#334155" />
    <circle cx="115" cy="45" r={isReference ? "4" : "8"} fill="#334155" />
  </svg>
);

const CatSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <circle id="head" cx="100" cy="70" r="50" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['head'] || 'white'} onClick={() => onPartClick?.('head')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <path id="lear" d="M60 40 L80 30 L90 60 Z" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['lear'] || 'white'} onClick={() => onPartClick?.('lear')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <path id="rear" d="M140 40 L120 30 L110 60 Z" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['rear'] || 'white'} onClick={() => onPartClick?.('rear')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <ellipse id="body" cx="100" cy="140" rx="60" ry="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['body'] || 'white'} onClick={() => onPartClick?.('body')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <circle cx="80" cy="70" r={isReference ? "2" : "5"} fill="#334155" />
    <circle cx="120" cy="70" r={isReference ? "2" : "5"} fill="#334155" />
  </svg>
);

const TreeSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="trunk" x="90" y="140" width="20" height="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['trunk'] || 'white'} onClick={() => onPartClick?.('trunk')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <circle id="top" cx="100" cy="70" r="50" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['top'] || 'white'} onClick={() => onPartClick?.('top')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <circle id="left" cx="60" cy="110" r="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['left'] || 'white'} onClick={() => onPartClick?.('left')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <circle id="right" cx="140" cy="110" r="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['right'] || 'white'} onClick={() => onPartClick?.('right')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
  </svg>
);

const SunSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <circle id="core" cx="100" cy="100" r="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['core'] || 'white'} onClick={() => onPartClick?.('core')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect 
        key={i}
        id={`ray-${i}`}
        x="95" y="45" width="10" height="25" rx="5"
        transform={`rotate(${angle} 100 100)`}
        stroke="#334155" strokeWidth={isReference ? "2" : "4"} 
        fill={colors[`ray-${i}`] || 'white'} 
        onClick={() => onPartClick?.(`ray-${i}`)} 
        className={`${!isReference && 'cursor-pointer'} transition-colors`} 
      />
    ))}
  </svg>
);

const HouseSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="base" x="40" y="100" width="120" height="80" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['base'] || 'white'} onClick={() => onPartClick?.('base')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <path id="roof" d="M30 100 L100 30 L170 100 Z" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['roof'] || 'white'} onClick={() => onPartClick?.('roof')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <rect id="door" x="85" y="140" width="30" height="40" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['door'] || 'white'} onClick={() => onPartClick?.('door')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    <rect id="window" x="60" y="120" width="20" height="20" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['window'] || 'white'} onClick={() => onPartClick?.('window')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
  </svg>
);

const FlowerSVG = ({ onPartClick, colors, isReference }: SVGProps) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <rect id="stem" x="95" y="130" width="10" height="60" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['stem'] || 'white'} onClick={() => onPartClick?.('stem')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <circle 
        key={i}
        id={`petal-${i}`}
        cx="100" cy="70" r="30"
        transform={`rotate(${angle} 100 100)`}
        stroke="#334155" strokeWidth={isReference ? "2" : "4"} 
        fill={colors[`petal-${i}`] || 'white'} 
        onClick={() => onPartClick?.(`petal-${i}`)} 
        className={`${!isReference && 'cursor-pointer'} transition-colors`} 
      />
    ))}
    <circle id="center" cx="100" cy="100" r="20" stroke="#334155" strokeWidth={isReference ? "2" : "4"} fill={colors['center'] || 'white'} onClick={() => onPartClick?.('center')} className={`${!isReference && 'cursor-pointer'} transition-colors`} />
  </svg>
);

const RESOLVED_REFERENCE_COLORS: Record<ImageKey, Record<string, string>> = {
  robot: { head: '#3B82F6', body: '#EF4444', larm: '#FBBF24', rarm: '#FBBF24' }, // Blue, Red, Yellow
  cat: { head: '#FBBF24', body: '#F97316', lear: '#EF4444', rear: '#EF4444' }, // Yellow, Orange, Red
  tree: { trunk: '#78350F', top: '#22C55E', left: '#22C55E', right: '#22C55E' }, // Brown, Green
  sun: { core: '#FBBF24', 'ray-0': '#F97316', 'ray-1': '#F97316', 'ray-2': '#F97316', 'ray-3': '#F97316', 'ray-4': '#F97316', 'ray-5': '#F97316', 'ray-6': '#F97316', 'ray-7': '#F97316' }, // Yellow, Orange
  house: { base: '#7DD3FC', roof: '#EF4444', door: '#78350F', window: '#FBBF24' }, // Light Blue, Red, Brown, Yellow
  flower: { stem: '#22C55E', center: '#FBBF24', 'petal-0': '#A855F7', 'petal-1': '#A855F7', 'petal-2': '#A855F7', 'petal-3': '#A855F7', 'petal-4': '#A855F7' }, // Green, Yellow, Purple (switched Pink to Purple)
};

export const ColoringSuite = () => {
  const [activeColor, setActiveColor] = useState(COLORS[0].value);
  const [selectedImage, setSelectedImage] = useState<ImageKey>('robot');
  const [filledParts, setFilledParts] = useState<Record<ImageKey, Record<string, string>>>({
    robot: {},
    cat: {},
    tree: {},
    sun: {},
    house: {},
    flower: {},
  });

  const checkCompletion = (newFilledParts: Record<string, string>) => {
    const targetColors = RESOLVED_REFERENCE_COLORS[selectedImage];
    const targetParts = Object.keys(targetColors);
    
    const isComplete = targetParts.every(part => 
      newFilledParts[part]?.toLowerCase() === targetColors[part].toLowerCase()
    );

    if (isComplete) {
      // Play Clap Sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
      audio.play().catch(() => {});

      setTimeout(() => {
        const currentIndex = IMAGES.findIndex(img => img.id === selectedImage);
        const nextIndex = (currentIndex + 1) % IMAGES.length;
        setSelectedImage(IMAGES[nextIndex].id);
      }, 2500);
    }
  };

  const handlePartClick = (partId: string) => {
    const newParts = {
      ...filledParts[selectedImage],
      [partId]: activeColor,
    };

    setFilledParts(prev => ({
      ...prev,
      [selectedImage]: newParts
    }));

    checkCompletion(newParts);
  };

  const renderSVG = (isReference = false) => {
    const colors = isReference ? RESOLVED_REFERENCE_COLORS[selectedImage] : filledParts[selectedImage];
    const props = { onPartClick: isReference ? undefined : handlePartClick, colors, isReference };
    switch (selectedImage) {
      case 'robot': return <RobotSVG {...props} />;
      case 'cat': return <CatSVG {...props} />;
      case 'tree': return <TreeSVG {...props} />;
      case 'sun': return <SunSVG {...props} />;
      case 'house': return <HouseSVG {...props} />;
      case 'flower': return <FlowerSVG {...props} />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl font-black text-slate-800 md:text-6xl">
          Coloring <span className="text-orange-400">Suite</span>
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-500 mb-8">Pick a color and tap a section to paint your world!</p>
        
        {/* Reference Image Box */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-orange-100 flex flex-col items-center animate-bounce-slow">
          <span className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">Try this!</span>
          <div className="h-24 w-24 opacity-80">
            {renderSVG(true)}
          </div>
        </div>
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

        {/* Palette: Color Picker (Round Pencil Shades style) */}
        <div className="flex flex-col items-center bg-white/50 backdrop-blur-md p-6 rounded-[3rem] shadow-inner border-2 border-slate-100 lg:w-48">
          <div className="flex items-center gap-2 mb-6 text-slate-400 font-black uppercase tracking-widest text-xs text-center">
            <Palette className="h-4 w-4" />
            12 Pencil Shades
          </div>
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 lg:gap-6">
            {COLORS.map((color) => (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setActiveColor(color.value)}
                className={`h-10 w-10 lg:h-12 lg:w-12 rounded-full border-4 transition-all shadow-sm ${
                  activeColor === color.value 
                    ? 'border-slate-800 scale-110 shadow-xl' 
                    : 'border-white hover:border-slate-200'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
