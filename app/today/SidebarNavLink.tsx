"use client";

import React from "react";

interface SidebarNavLinkProps {
  icon: React.ReactNode | string;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function SidebarNavLink({
  icon,
  label,
  count = 0,
  active,
  onClick,
  style,
}: SidebarNavLinkProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[#fbe9e7] text-[#db4c3f]"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
      style={style}
    >
      <span className="flex w-6 items-center justify-center text-lg">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {count && count > 0 ? (
        <span className="ml-auto rounded px-2 py-0.5 text-xs font-semibold text-gray-600">
          {count > 0 ? count : ""}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
