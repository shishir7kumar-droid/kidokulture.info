"use client";
import React from 'react';
import { ShieldCheck, Heart, Lock, HelpCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-sky-200">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-20 h-20 bg-sky-100 rounded-3xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-12 h-12 text-sky-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 uppercase tracking-tight">Privacy Policy</h1>
            <p className="text-lg font-bold text-slate-500 italic">"Making the internet safe and fun for little explorers."</p>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">Our Commitment</h2>
              </div>
              <p className="text-lg font-medium">
                At KidoKulture, we believe that children deserve a safe, private, and fun online environment. 
                We are fully committed to complying with the **Children's Online Privacy Protection Act (COPPA)**. 
                Our platform is designed to be interactive without compromising the safety of our young users.
              </p>
            </section>

            <section className="bg-sky-50 p-8 rounded-[2rem] border border-sky-100">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-sky-600" />
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">Data Collection</h2>
              </div>
              <p className="text-lg font-medium mb-4">
                **We do not collect any personal information from children.** 
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium">
                <li>No names, no emails, and no phone numbers are required to play.</li>
                <li>We do not use tracking cookies that identify individuals.</li>
                <li>Any data collected is purely technical (like browser type) and used only to make the games run smoothly.</li>
                <li>We do not share any data with third-party advertisers.</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">For Parents</h2>
              </div>
              <p className="text-lg font-medium mb-4">
                We encourage parents to be involved in their children's digital journey. 
                While we have built KidoKulture to be as safe as possible, your guidance is the best protection.
              </p>
              <p className="text-lg font-medium">
                If you have any questions about our privacy practices, please contact our lead developer at:
                <br />
                <a href="mailto:01hans.rk@gmail.com" className="text-sky-600 font-black hover:underline mt-2 inline-block">01hans.rk@gmail.com</a>
              </p>
            </section>

            <div className="pt-8 border-t border-slate-100 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Last Updated: April 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
