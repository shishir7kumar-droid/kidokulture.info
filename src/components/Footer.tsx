"use client";
import React from 'react';
import Image from 'next/image';
import { Heart, Smartphone } from 'lucide-react';
import { HeaderInstallButton } from './HeaderInstallButton';

export const Footer = () => {
  return (
    <footer className="bg-white py-16 shadow-inner relative overflow-hidden border-t border-slate-100">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-sky-400 to-emerald-400" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <Image 
              src="https://res.cloudinary.com/dvgv5h1u1/image/upload/v1775139446/kklogo_cwnhlq.png" 
              alt="KidoKulture Logo" 
              width={160} 
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* R.K. Hans Note */}
          <div className="mb-12 bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm w-full max-w-2xl">
            <div className="flex justify-center mb-4">
               <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed italic">
              "Thank you for being part of this journey. We strive to make digital exploration safe and magical for every child more interactive games will be added soon."
            </p>
            <p className="mt-6 text-lg font-black text-sky-600 uppercase tracking-wider">
              — R.K. Hans, the Architect Dev
            </p>
          </div>

          {/* UPI Support Section */}
          <div className="mb-12 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-4 bg-white">
              <img 
                src="https://res.cloudinary.com/dvgv5h1u1/image/upload/v1776784287/phonepe_heqw0a.jpg" 
                alt="UPI Payment Support" 
                className="w-full h-auto"
              />
            </div>
            <div className="max-w-md">
              <p className="text-sm font-bold text-slate-500 bg-slate-100 px-6 py-3 rounded-full inline-block">
                Supported in: India, Singapore, UAE, Mauritius, Nepal, Bhutan, Sri Lanka, and France.
              </p>
            </div>
          </div>

          {/* PWA Action */}
          <div className="mb-12 flex flex-col items-center gap-4">
             <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Take Kidokulture anywhere</p>
             <HeaderInstallButton />
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-black text-slate-400 mb-10 uppercase tracking-widest">
            <a href="/privacy" className="hover:text-sky-500 transition-colors uppercase">Privacy Policy</a>
            <a href="mailto:01hans.rk@gmail.com" className="hover:text-sky-500 transition-colors lowercase">01hans.rk@gmail.com</a>
            <a href="https://wa.me/917302125050" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors uppercase">WhatsApp: +91 73021 25050</a>
          </div>
          <p className="text-slate-300 font-bold text-sm">© 2026 Kidokulture. Built with ❤️ for the next generation.</p>
        </div>
      </div>
    </footer>
  );
};
