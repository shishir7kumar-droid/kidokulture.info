"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

interface ParentalConsentProps {
  isOpen: boolean;
  onClose: () => void;
  onConsent: () => void;
  featureName: string;
}

export const ParentalConsent = ({ isOpen, onClose, onConsent, featureName }: ParentalConsentProps) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  
  // A simple math problem to verify adulthood
  const [problem] = useState(() => {
    const a = Math.floor(Math.random() * 20) + 10;
    const b = Math.floor(Math.random() * 20) + 10;
    return { a, b, result: a + b };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer) === problem.result) {
      onConsent();
      onClose();
    } else {
      setError(true);
      setAnswer('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4">Parental Verification</h2>
              
              <p className="text-slate-500 font-bold mb-8 leading-relaxed">
                To access <span className="text-orange-500">{featureName}</span>, please solve this simple math problem to prove you are a parent or guardian.
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                  <label className="block text-3xl font-black text-slate-700 mb-4">
                    {problem.a} + {problem.b} = ?
                  </label>
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter answer"
                    className={`w-full bg-white border-2 rounded-xl px-6 py-4 text-center text-2xl font-black text-slate-700 outline-none transition-all ${
                      error ? 'border-rose-400 shake' : 'border-slate-100 focus:border-sky-400'
                    }`}
                    autoFocus
                  />
                </div>

                {error && (
                  <p className="text-rose-500 font-bold">Oops! That's not quite right. Try again.</p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-sky-600 text-white font-black py-4 rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all uppercase tracking-widest"
                  >
                    Confirm & Proceed
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-slate-100 text-slate-400 font-black py-4 rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-300 text-xs font-black uppercase tracking-widest">
                <Heart className="w-3 h-3 fill-slate-300" />
                Safe for Kids
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
