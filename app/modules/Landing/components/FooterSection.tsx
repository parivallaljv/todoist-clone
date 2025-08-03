import React from "react";
import { CheckCircle } from "react-feather";

const features = ["How It Works", "For Teams", "Pricing", "Templates"];
const resources = [
  "Download Apps",
  "Help Center",
  "Productivity Methods",
  "Integrations",
  "Channel Partners",
  "Developer API",
  "Status",
];
const company = ["About Us", "Careers", "Inspiration Hub", "Press", "Twist"];

export default function FooterSection() {
  return (
    <footer className="animate-fadeIn bg-red-50 px-4 py-12 md:px-24">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
        <div>
          <div className="mb-4 flex items-center">
            <span className="mr-2 flex h-8 w-8 items-center justify-center rounded border border-[#db4c3f] bg-white">
              <CheckCircle size={24} color="#db4c3f" />
            </span>
            <span className="text-2xl font-bold text-gray-900">todoist</span>
          </div>
          <p className="mb-4 max-w-xs text-gray-700">
            Join millions of people who organize work and life with Todoist.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="mb-2 font-bold">Features</h4>
            <ul>
              {features.map((f, i) => (
                <li
                  key={i}
                  className="mb-1 cursor-pointer text-gray-700 hover:underline"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-bold">Resources</h4>
            <ul>
              {resources.map((r, i) => (
                <li
                  key={i}
                  className="mb-1 cursor-pointer text-gray-700 hover:underline"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-bold">Company</h4>
            <ul>
              {company.map((c, i) => (
                <li
                  key={i}
                  className="mb-1 cursor-pointer text-gray-700 hover:underline"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        © Doist Inc. All rights reserved.
      </div>
    </footer>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 1s ease-in; }
