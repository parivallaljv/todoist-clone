import React from 'react';

const testimonials = [
  {
    quote: 'Simple, straightforward, and super powerful',
    source: 'THE VERGE',
  },
  {
    quote: 'The best to-do list app on the market',
    source: 'PC MAG',
  },
  {
    quote: 'Nothing short of stellar',
    source: 'techradar',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 md:px-24 bg-gradient-to-b from-white to-green-50 animate-slideIn">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {testimonials.map((t, i) => (
          <div key={i} className="text-center max-w-xs">
            <p className="italic text-xl mb-2">“{t.quote}”</p>
            <span className="font-bold text-gray-700">{t.source}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes slideIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
// .animate-slideIn { animation: slideIn 1s ease; } 