import React from 'react';

const features = ['How It Works', 'For Teams', 'Pricing', 'Templates'];
const resources = ['Download Apps', 'Help Center', 'Productivity Methods', 'Integrations', 'Channel Partners', 'Developer API', 'Status'];
const company = ['About Us', 'Careers', 'Inspiration Hub', 'Press', 'Twist'];

export default function FooterSection() {
  return (
    <footer className="bg-red-50 py-12 px-4 md:px-24 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="flex items-center mb-4">
            <span className="bg-red-500 w-8 h-8 rounded flex items-center justify-center mr-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M7 8h10M7 12h10M7 16h10" stroke="#EA4B2A" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <span className="text-2xl font-bold text-gray-900">todoist</span>
          </div>
          <p className="text-gray-700 max-w-xs mb-4">Join millions of people who organize work and life with Todoist.</p>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="font-bold mb-2">Features</h4>
            <ul>
              {features.map((f, i) => <li key={i} className="text-gray-700 mb-1 hover:underline cursor-pointer">{f}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul>
              {resources.map((r, i) => <li key={i} className="text-gray-700 mb-1 hover:underline cursor-pointer">{r}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Company</h4>
            <ul>
              {company.map((c, i) => <li key={i} className="text-gray-700 mb-1 hover:underline cursor-pointer">{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8">© Doist Inc. All rights reserved.</div>
    </footer>
  );
}

// Tailwind animation (add to globals.css or tailwind config if not present):
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 1s ease-in; } 