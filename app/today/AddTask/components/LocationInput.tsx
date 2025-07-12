import React from "react";
import { Input } from "@/components/ui/input";

export function LocationInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-lg">📍</span>
      <Input
        className="flex-1 border-0 bg-transparent text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none active:outline-none hover:border-0 focus:border-0 active:border-0"
        type="text"
        placeholder="Location"
        value={value}
        onChange={onChange}
        style={{
          minWidth: 0,
          fontSize: 14,
          padding: "2px 4px",
          margin: 0,
          boxShadow: "none",
          outline: "none",
          border: "none",
        }}
      />
    </div>
  );
}
