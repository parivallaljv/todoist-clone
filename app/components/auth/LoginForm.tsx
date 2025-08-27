"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(email, password);
    } else {
      // Default behavior - redirect to today page
      router.push("/today");
    }
  };

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email..."
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          className="w-full pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute top-8 right-2 h-auto px-2 py-1 text-gray-500 focus:outline-none"
        >
          {showPassword ? "🙈" : "👁️"}
        </Button>
      </div>
      <Button
        type="submit"
        className="w-full rounded-md bg-[#db4c3f] py-2 text-base font-semibold text-white hover:bg-[#c44536]"
      >
        Log in
      </Button>
    </form>
  );
}
