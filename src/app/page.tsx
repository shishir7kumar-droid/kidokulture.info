export const dynamic = 'force-dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { InteractiveCard } from '@/components/InteractiveCard';
import { ColoringSuite } from '@/components/ColoringSuite';
import { PlayCircle, GraduationCap, Compass } from 'lucide-react';

export default function Home() {
  const worlds = [
    {
      title: 'Play Zone',
      description: 'Engaging games that build coordination and strategy.',
      color: 'bg-orange-400',
      icon: <PlayCircle className="h-12 w-12" />,
    },
    {
      title: 'Learning Lab',
      description: 'Educational quests across science, math, and history.',
      color: 'bg-emerald-400',
      icon: <GraduationCap className="h-12 w-12" />,
    },
    {
      title: 'Discovery Path',
      description: 'Explore nature and culture in interactive 3D worlds.',
      color: 'bg-sky-400',
      icon: <Compass className="h-12 w-12" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200">
      <Navbar />
      
      <Hero />

      <ColoringSuite />
      
      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tight text-slate-800">
            Adventure Awaits
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-bold text-slate-500">
            Choose your journey and start exploring the magic of KidoKulture today.
          </p>
        </div>
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world, index) => (
            <InteractiveCard
              key={index}
              title={world.title}
              description={world.description}
              color={world.color}
              icon={world.icon}
            />
          ))}
        </div>
      </section>
      
      <footer className="bg-white py-16 text-center shadow-inner">
        <div className="container mx-auto px-4">
          <p className="mb-4 text-3xl font-black text-sky-600">
            Kido<span className="text-orange-400">Kulture</span>
          </p>
          <div className="flex justify-center space-x-8 text-lg font-bold text-slate-500">
            <a href="#" className="hover:text-sky-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Safety</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Contact</a>
          </div>
          <p className="mt-8 text-slate-400 font-bold">© 2026 KidoKulture. Sparking joy in every child.</p>
        </div>
      </footer>
    </main>
  );
}
