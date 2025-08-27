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
      className="mb-1 w-full border-0 bg-transparent font-medium text-gray-700 placeholder-gray-400 shadow-none hover:border-0 focus:border-0 focus:ring-0 focus:outline-none active:border-0 active:outline-none"
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
