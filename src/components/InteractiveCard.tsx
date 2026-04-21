"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
}

export const InteractiveCard = ({ title, description, color, icon }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: 2 }}
      className={`relative overflow-hidden rounded-3xl p-8 shadow-lg ${color} text-white cursor-pointer group`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Star className="h-12 w-12 fill-white" />
      </div>
      
      <div className="mb-4">
        {icon || <Star className="h-10 w-10 fill-white" />}
      </div>
      
      <h3 className="mb-2 text-3xl font-black">{title}</h3>
      <p className="text-lg font-bold opacity-90">{description}</p>
      
      <motion.div
        className="mt-6 inline-block rounded-full bg-white/30 px-4 py-2 font-bold backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
      >
        Play Now →
      </motion.div>
    </motion.div>
  );
};
