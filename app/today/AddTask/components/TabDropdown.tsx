import React from "react";
import { Button } from "@/components/ui/button";

export function TabDropdown({
  TABS,
  selectedTab,
  setSelectedTab,
  tabDropdownOpen,
  setTabDropdownOpen,
}: any) {
  return (
    <div className="relative mt-1">
      <Button
        type="button"
        className="px-3 py-1 rounded-full border bg-white border-gray-200 text-gray-700 text-xs font-medium shadow-none w-full flex items-center justify-start"
        onClick={() => setTabDropdownOpen((v: boolean) => !v)}
        style={{ minWidth: 0, padding: "2px 10px" }}
      >
        <span>{TABS.find((t: any) => t.key === selectedTab)?.icon}</span>
        <span className="ml-1">
          {TABS.find((t: any) => t.key === selectedTab)?.label}
        </span>
      </Button>
      {tabDropdownOpen && (
        <div className="absolute left-0 top-[110%] bg-white border rounded-xl shadow z-10 min-w-[120px]">
          {TABS.map((tab: any) => (
            <Button
              key={tab.key}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 ${
                selectedTab === tab.key ? "bg-gray-100 font-semibold" : ""
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
