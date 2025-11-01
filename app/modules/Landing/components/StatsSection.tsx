'use client';

import React, { useEffect, useState } from 'react';

const stats = [
  { label: 'app downloads', value: 30, suffix: '+ million' },
  { label: 'tasks completed', value: 2, suffix: '+ billion' },
  { label: 'years in business', value: 18, suffix: '' },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

export default function StatsSection() {
  const count1 = useCountUp(stats[0].value);
  const count2 = useCountUp(stats[1].value);
  const count3 = useCountUp(stats[2].value);
  const counts = [count1, count2, count3];
  return (
    <section className="py-16 px-4 md:px-24 bg-white text-center animate-fadeIn">
      <h2 className="text-4xl font-bold mb-2">A task manager you can trust for life</h2>
      <p className="text-lg text-gray-600 mb-8">We&apos;ve been building Todoist for 18 years and 152 days. Rest assured that we&apos;ll never sell out to the highest bidder.</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-8">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-5xl font-bold text-green-700">{counts[i]}{s.suffix}</span>
            <span className="text-gray-700 mt-2 text-lg">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}