import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Tag, Home, Inbox } from "react-feather";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const recentlyViewed = [
  { icon: <Calendar size={16} color="#db4c3f" />, label: "Today" },
  { icon: <Clock size={16} color="#db4c3f" />, label: "Upcoming" },
  { icon: <Tag size={16} color="#db4c3f" />, label: "read" },
];

const navigation = [
  {
    icon: <Home size={16} color="#db4c3f" />,
    label: "Go to home",
    shortcut: "G then H",
  },
  {
    icon: <Inbox size={16} color="#db4c3f" />,
    label: "Go to Inbox",
    shortcut: "G then I",
  },
  {
    icon: <Calendar size={16} color="#db4c3f" />,
    label: "Go to Today",
    shortcut: "G then T",
  },
  {
    icon: <Clock size={16} color="#db4c3f" />,
    label: "Go to Upcoming",
    shortcut: "G then U",
  },
  {
    icon: <Tag size={16} color="#db4c3f" />,
    label: "Go to Filters & Labels",
    shortcut: "G then V",
  },
];

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-2xl p-6 shadow-2xl">
        <div className="mb-4 flex items-center">
          <Input
            className="w-full text-base"
            placeholder="Search or type a command…"
            autoFocus
          />
          <span className="ml-2 font-mono text-xs text-gray-400">
            Ctrl&nbsp;K
          </span>
        </div>
        {/* Recently viewed */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-gray-500">
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
          <div className="mb-2 text-xs font-semibold text-gray-500">
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
                <span className="ml-auto rounded border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-400">
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
