import React from "react";

const templates = [
  {
    title: "Accounting Tasks",
    desc: "Create a system to keep your books, receipts, and invoices organized.",
  },
  {
    title: "Business Travel Packing",
    desc: "Never forget your laptop charger, lucky shoes, or passport again.",
  },
  {
    title: "Client Management",
    desc: "Organize your work with clients from the smallest to largest details.",
  },
  {
    title: "Deep Work",
    desc: "Practice prioritizing focus and eliminating distraction with this template.",
  },
  {
    title: "Meeting Agenda",
    desc: "Waste less time in meetings, ensuring they're efficient and action-oriented.",
  },
];

export default function TemplatesSection() {
  return (
    <section className="bg-white px-4 py-16 md:px-24">
      <h2 className="mb-2 text-center text-4xl font-bold">
        Kickstart your next project with Todoist Templates
      </h2>
      <p className="mb-8 text-center text-lg text-gray-600">
        No need to create projects or setups from scratch when we have 50+
        templates made for you.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {templates.map((t, i) => (
          <div
            key={i}
            className={`animate-staggerFadeIn w-64 rounded-xl bg-gray-50 p-6 opacity-0 shadow-md transition-all duration-500`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <h3 className="mb-2 text-lg font-bold">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
