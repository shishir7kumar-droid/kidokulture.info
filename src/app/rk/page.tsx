"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Gamepad2, BookOpen, Microscope, Save, Power, LayoutDashboard } from 'lucide-react';

const ALL_GAMES = {
  'play-zone': [
    { id: 'ColoringSuite', name: 'Coloring Suite' },
    { id: 'SoundExplorer', name: 'Sound Explorer' },
    { id: 'BubblePopMath', name: 'Bubble Pop Math' }
  ],
  'learning-lab': [
    { id: 'ShadowMatch', name: 'Shadow Match' },
    { id: 'HungryCaterpillar', name: 'Hungry Caterpillar' },
    { id: 'LetterTrace', name: 'Letter Trace' }
  ],
  'discovery-path': [
    { id: 'SinkOrFloat', name: 'Sink or Float' },
    { id: 'SeedToFlower', name: 'Little Farmer' },
    { id: 'MixTheColors', name: 'Mix the Colors' }
  ]
};

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeGames, setActiveGames] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/rk/settings');
        const data = await res.json();
        if (data.activeGames) {
          setActiveGames(data.activeGames);
        }
      } catch (e) {
        console.error("Failed to fetch settings", e);
      }
    };
    fetchSettings();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'daikin520') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const toggleGame = (id: string) => {
    setActiveGames(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/rk/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeGames })
      });
      if (res.ok) {
        alert('Settings Saved Successfully to DB!');
      }
    } catch (e) {
      alert('Failed to save settings');
    }
    setIsSaving(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-sky-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">RK Dashboard</h1>
            <p className="text-slate-400 font-bold">Secure Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:border-sky-400 outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:border-sky-400 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-rose-500 font-bold text-center text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-sky-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-sky-200 hover:bg-sky-700 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">RK Architect Console</span>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Gamepad2 className="text-orange-400" />
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Play Zone</h2>
            </div>
            <div className="space-y-4">
              {ALL_GAMES['play-zone'].map(game => (
                <div key={game.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-700">{game.name}</span>
                  <button 
                    onClick={() => toggleGame(game.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      activeGames[game.id] ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-300'
                    }`}
                  >
                    <Power size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <BookOpen className="text-emerald-500" />
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Learning Lab</h2>
            </div>
            <div className="space-y-4">
              {ALL_GAMES['learning-lab'].map(game => (
                <div key={game.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-700">{game.name}</span>
                  <button 
                    onClick={() => toggleGame(game.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      activeGames[game.id] ? 'bg-emerald-100 text-emerald-500' : 'bg-slate-100 text-slate-300'
                    }`}
                  >
                    <Power size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Microscope className="text-sky-500" />
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Discovery Path</h2>
            </div>
            <div className="space-y-4">
              {ALL_GAMES['discovery-path'].map(game => (
                <div key={game.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-700">{game.name}</span>
                  <button 
                    onClick={() => toggleGame(game.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      activeGames[game.id] ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-300'
                    }`}
                  >
                    <Power size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
