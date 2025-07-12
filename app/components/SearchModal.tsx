import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const recentlyViewed = [
  { icon: "📅", label: "Today" },
  { icon: "📆", label: "Upcoming" },
  { icon: "🏷️", label: "read" },
];

const navigation = [
  { icon: "🏠", label: "Go to home", shortcut: "G then H" },
  { icon: "📥", label: "Go to Inbox", shortcut: "G then I" },
  { icon: "📅", label: "Go to Today", shortcut: "G then T" },
  { icon: "📆", label: "Go to Upcoming", shortcut: "G then U" },
  { icon: "🏷️", label: "Go to Filters & Labels", shortcut: "G then V" },
];

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 rounded-2xl shadow-2xl">
        <div className="flex items-center mb-4">
          <Input
            className="w-full text-base"
            placeholder="Search or type a command…"
            autoFocus
          />
          <span className="ml-2 text-xs text-gray-400 font-mono">
            Ctrl&nbsp;K
          </span>
        </div>
        {/* Recently viewed */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">
            Recently viewed
          </div>
          <ul>
            {recentlyViewed.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 py-1 text-base text-gray-700"
              >
                <span className="icon" style={{ color: "#808080" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Navigation */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">
            Navigation
          </div>
          <ul>
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 py-1 text-base text-gray-700"
              >
                <span className="icon" style={{ color: "#808080" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span className="ml-auto text-xs text-gray-400 font-mono bg-gray-100 rounded px-2 py-0.5 border border-gray-200">
                  {item.shortcut}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
