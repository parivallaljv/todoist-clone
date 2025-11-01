import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface TabDropdownProps {
  TABS: Tab[];
  selectedTab: string;
  setSelectedTab: (_key: string) => void;
  tabDropdownOpen: boolean;
  setTabDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

export function TabDropdown({
  TABS,
  selectedTab,
  setSelectedTab,
  tabDropdownOpen,
  setTabDropdownOpen,
}: TabDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTabDropdownOpen(false);
      }
    }
    if (tabDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tabDropdownOpen, setTabDropdownOpen]);

  return (
    <div className="relative mt-1" ref={ref}>
      <Button
        type="button"
        className="flex w-full items-center justify-start rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-none"
        onClick={() => setTabDropdownOpen((v: boolean) => !v)}
      >
        <span>{TABS.find((t) => t.key === selectedTab)?.icon}</span>
        <span className="ml-1">
          {TABS.find((t) => t.key === selectedTab)?.label}
        </span>
      </Button>
      {tabDropdownOpen && (
        <div className="absolute top-[110%] left-0 z-10 min-w-[120px] rounded-xl border bg-white shadow">
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              className={`cal-overlay-icon flex w-full items-center justify-start gap-2 border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-700 hover:border-[#db4c3f] hover:bg-[#db4c3f] hover:text-white ${selectedTab === tab.key ? "bg-gray-100 font-semibold" : ""
                }`}
              onClick={() => {
                setSelectedTab(tab.key);
                setTabDropdownOpen(false);
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
