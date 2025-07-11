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
  count,
  active,
  onClick,
  style,
}: SidebarNavLinkProps) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
        active
          ? "bg-[#fbe9e7] text-[#db4c3f]"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
      style={style}
    >
      <span className="text-lg w-6 flex items-center justify-center">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="ml-auto text-xs bg-gray-200 rounded px-2 py-0.5 font-semibold text-gray-600">
          {count}
        </span>
      )}
    </div>
  );
}
