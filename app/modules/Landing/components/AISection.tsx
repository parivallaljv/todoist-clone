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
    <section className="animate-fadeInLeft flex flex-col items-center justify-between bg-green-50 px-4 py-16 md:flex-row md:px-24">
      <div className="max-w-xl">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          Smart features that feel magical
        </h2>
        <p className="mb-6 text-lg text-gray-600">
          See how Todoist Assist works intelligently behind the scenes to
          transform scattered tasks into clear action plans.
        </p>
        <a href="#" className="font-medium text-blue-600 underline">
          Learn about our thoughtful approach to AI
        </a>
      </div>
      <div className="mt-10 flex-shrink-0 md:mt-0 md:ml-12">
        <div className="animate-fadeInLeft relative h-[200px] w-[340px] overflow-hidden rounded-xl bg-white shadow-lg delay-200">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            onEnded={handleVideoEnded}
            muted
          >
            <source src="/videos/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-2xl text-white transition-colors hover:bg-black/90"
          >
            {isPlaying ? "⏸" : "▶"}
          </Button>
        </div>
      </div>
    </section>
  );
}
