"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function AISection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-24 bg-green-50 animate-fadeInLeft">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Smart features that feel magical
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          See how Todoist Assist works intelligently behind the scenes to
          transform scattered tasks into clear action plans.
        </p>
        <a href="#" className="text-blue-600 font-medium underline">
          Learn about our thoughtful approach to AI
        </a>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12 flex-shrink-0">
        <div className="relative w-[340px] h-[200px] bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInLeft delay-200">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnded}
            muted
          >
            <source src="/videos/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Button
            onClick={togglePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl hover:bg-black/90 transition-colors"
          >
            {isPlaying ? "⏸" : "▶"}
          </Button>
        </div>
      </div>
    </section>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
// .animate-fadeInLeft { animation: fadeInLeft 1s ease; }
