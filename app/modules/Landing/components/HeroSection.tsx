import React from 'react';
import { Button } from "@/components/ui/button";
import HeroImg from './images/hero1.jpg'
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-24 bg-white animate-fadeIn">
      <div className="max-w-xl mt-32">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Keep your team moving forward</h1>
        <p className="text-lg text-gray-600 mb-6">Todoist is task management for teams who have better things to do than overcomplicate it.</p>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300">Start for free</Button>
        <div className="flex items-center mt-4 space-x-2">
          <span className="text-gray-500">⭐ 374K+ reviews</span>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12 flex-shrink-0">
        {/* Replace with actual image import if available */}
        <div className="w-[420px] h-[320px] bg-gray-100 rounded-xl shadow-lg flex items-center justify-center animate-fadeIn delay-200">
          <Image src={HeroImg} alt="hero-img" />
        </div>
      </div>
    </section>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 1s ease-in; } 