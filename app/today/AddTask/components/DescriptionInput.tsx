import React from "react";
import { Input } from "@/components/ui/input";

export function DescriptionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      className="w-full text-gray-400 placeholder-gray-300 bg-transparent border-0 shadow-none mb-2 focus:ring-0 focus:outline-none active:outline-none hover:border-0 focus:border-0 active:border-0"
      placeholder="Description"
      value={value}
      onChange={onChange}
      style={{
        fontSize: 14,
        color: "#b0b0b0",
        padding: "2px 4px",
        margin: 0,
        boxShadow: "none",
        outline: "none",
        border: "none",
      }}
    />
  );
}
