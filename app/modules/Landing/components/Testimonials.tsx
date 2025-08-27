import React from "react";

const testimonials = [
  {
    quote: "Simple, straightforward, and super powerful",
    source: "THE VERGE",
  },
  {
    quote: "The best to-do list app on the market",
    source: "PC MAG",
  },
  {
    quote: "Nothing short of stellar",
    source: "techradar",
  },
];

export default function Testimonials() {
  return (
    <section className="animate-slideIn bg-gradient-to-b from-white to-green-50 px-4 py-16 md:px-24">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
        {testimonials.map((t, i) => (
          <div key={i} className="max-w-xs text-center">
            <p className="mb-2 text-xl italic">“{t.quote}”</p>
            <span className="font-bold text-gray-700">{t.source}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
