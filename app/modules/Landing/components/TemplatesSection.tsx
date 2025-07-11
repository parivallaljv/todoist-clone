import React from 'react';

const templates = [
  {
    title: 'Accounting Tasks',
    desc: 'Create a system to keep your books, receipts, and invoices organized.',
  },
  {
    title: 'Business Travel Packing',
    desc: 'Never forget your laptop charger, lucky shoes, or passport again.',
  },
  {
    title: 'Client Management',
    desc: 'Organize your work with clients from the smallest to largest details.',
  },
  {
    title: 'Deep Work',
    desc: 'Practice prioritizing focus and eliminating distraction with this template.',
  },
  {
    title: 'Meeting Agenda',
    desc: "Waste less time in meetings, ensuring they're efficient and action-oriented.",
  },
];

export default function TemplatesSection() {
  return (
    <section className="py-16 px-4 md:px-24 bg-white">
      <h2 className="text-4xl font-bold mb-2 text-center">Kickstart your next project with Todoist Templates</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">No need to create projects or setups from scratch when we have 50+ templates made for you.</p>
      <div className="flex flex-wrap justify-center gap-6">
        {templates.map((t, i) => (
          <div key={i} className={`w-64 p-6 bg-gray-50 rounded-xl shadow-md transition-all duration-500 opacity-0 animate-staggerFadeIn`} style={{ animationDelay: `${i * 120}ms` }}>
            <h3 className="font-bold text-lg mb-2">{t.title}</h3>
            <p className="text-gray-600 text-sm">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes staggerFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
// .animate-staggerFadeIn { animation: staggerFadeIn 0.7s ease forwards; } 