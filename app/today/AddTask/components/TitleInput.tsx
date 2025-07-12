import React from "react";
import { Input } from "@/components/ui/input";

export function TitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      className="w-full font-medium text-gray-700 placeholder-gray-400 bg-transparent border-0 shadow-none mb-1 focus:ring-0 focus:outline-none active:outline-none hover:border-0 focus:border-0 active:border-0"
      placeholder="Practice math problems daily at 4pm"
      autoFocus
      value={value}
      onChange={onChange}
      style={{
        fontWeight: 500,
        fontSize: 14,
        color: "#757575",
        padding: "2px 4px",
        margin: 0,
        boxShadow: "none",
        outline: "none",
        border: "none",
      }}
    />
  );
}
