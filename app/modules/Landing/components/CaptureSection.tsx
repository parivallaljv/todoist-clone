import React from "react";
import CaptureImg from "./images/hero2.jpg";
import Image from "next/image";

export default function CaptureSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-24 bg-white animate-fadeInUp">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-yellow-700">
          Clear your mind
        </h2>
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Capture tasks at the speed of thought
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          We&apos;ve spent over a decade refining Todoist to be an extension of your
          mind. Capture and organize tasks instantly using easy-flowing, natural
          language.
        </p>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12 flex-shrink-0">
        <div className="w-[340px] h-[180px] bg-yellow-100 rounded-xl shadow-lg flex items-center justify-center animate-fadeInUp delay-200">
          <Image src={CaptureImg} alt="capture-img" />
        </div>
      </div>
    </section>
  );
}
